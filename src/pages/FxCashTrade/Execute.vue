<template>
  <PageLayout>
    <q-card
      flat
      bordered
    >
      <q-tabs
        v-model="tab"
        active-color="primary"
        indicator-color="primary"
        align="left"
      >
        <q-tab
          :name="tabType.completedTrades"
          :label="$t('fxCashTrade.completedTradesTab')"
        />
        <q-tab
          :name="tabType.pendingTrades"
          :label="$t('fxCashTrade.pendingTradesTab')"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <!-- Completed Trades -->
        <q-tab-panel
          :name="tabType.completedTrades"
          class="q-px-none"
        >
          <DataTable
            :value="completedData"
            :columns="completedColumns"
            :loading-data-promise="loadingCompletedTradeDataPromise"
            :error-retry="boundFetchCompletedData"
            :search-value.sync="searchValue"

            @input="onCompletedDataInput"
          />
        </q-tab-panel>

        <!-- Pending Trades -->
        <q-tab-panel
          :name="tabType.pendingTrades"
          class="q-px-none"
        >
          <DataTable
            :value="pendingData"
            :columns="pendingColumns"
            :loading-data-promise="loadingPendingTradeDataPromise"
            :error-retry="boundFetchPendingData"
            :search-value.sync="searchValue"

            @input="onPendingDataInput"
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  flat
                  color="primary"
                  label="Cancel Trade"
                  @click="confirmCancelTrade(props.row.tradeId)"
                />
                <q-btn
                  flat
                  color="primary"
                  label="Execute Trade"
                  @click="confirmExecuteTrade(props.row.tradeId)"
                />
              </q-td>
            </template>
          </DataTable>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <!-- dialogs -->
    <SubmissionDialog
      :submission-promise="submissionPromise"
      :success-label="successLabel"
    />
  </PageLayout>
</template>

<script>
import FormatCurrencyMixin from 'src/mixins/FormatCurrencyMixin';
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import SubmissionDialog from 'src/components/SubmissionDialog';
import { URI } from 'src/config';

const tabType = {
  completedTrades: 'completedTrades',
  pendingTrades: 'pendingTrades',
};

const actionTypes = {
  cancel: 'cancel',
  execute: 'execute',
}

const sharedColumns = [
  {
    name: 'tradeId',
    label: 'Trade ID',
    field: 'tradeId',
    required: true,
    align: 'left',
  },
  {
    name: 'buyerAddress',
    label: 'Buyer Address',
    field: 'buyerAddress',
    require: true,
    align: 'left',
  },
  {
    name: 'productCode',
    label: 'Product Code',
    field: 'productCode',
    required: true,
    align: 'left',
  },
  {
    name: 'txId',
    label: 'TX ID',
    field: 'txId',
    required: true,
    align: 'left',
  },
  {
    name: 'sellerAddress',
    label: 'Seller Address',
    field: 'sellerAddress',
    required: true,
    align: 'left',
  },
  {
    name: 'creationDate',
    label: 'Creation Date',
    field: 'creationDate',
    required: true,
    align: 'left',
  },
];

export default {
  name: 'ExecuteFXCashTrade',
  components: {
    PageLayout,
    DataTable,
    SubmissionDialog,
  },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      tabType,
      tab: tabType.completedTrades,

      // TODO: proper definition
      completedColumns: [
        ...sharedColumns,
        {
          name: 'paymentAmount',
          label: 'Payment Amount',
          field: 'paymentAmount',
          required: true,
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              row.paymentCurrency,
              val
            );
          },
          align: 'left',
        },
      ],
      pendingColumns: [
        ...sharedColumns,
        {
          name: 'paymentAmount',
          label: 'Payment Amount',
          field: 'paymentAmount',
          required: true,
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              row.paymentCurrency,
              val
            );
          },
          align: 'left',
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'right',
          headerStyle: 'padding-right: 32px',
        }
      ],
      completedDataRaw: [],
      pendingDataRaw: [],

      searchValue: '',

      submissionPromise: null,
      successLabel: null,

      loadingCompletedTradeDataPromise: null,
      loadingPendingTradeDataPromise: null,
    };
  },
  computed: {
    completedData() {
      return this.completedDataRaw.map(item => {
        return item.TokenNAV;
      });
    },
    pendingData() {
      return this.pendingDataRaw.map(item => {
        return item.TokenNAV;
      });
    },
  },
  watch: {
    tab() {
      const { type } = this.$route.query;

      if (type === this.tab) {
        return;
      }

      this.$router.replace({
        query: {
          type: this.tab,
        }
      });

      this.fetchCurrentTabData();
    },
  },
  created() {
    const { type } = this.$route.query;
    const isOnPendingTrades = (type == tabType.pendingTrades);

    this.tab = isOnPendingTrades
      ? type
      : tabType.completedTrades;

    this.fetchCurrentTabData();

    this.boundFetchCompletedData = () => {
      this.fetchCompletedData();
    }

    this.boundFetchPendingData = () => {
      this.fetchPendingData();
    }
  },
  methods: {
    /**
     * Fetches data depending on which tab user is on.
     */
    fetchCurrentTabData() {
      const { type } = this.$route.query;
      const isOnPendingTrades = (type == tabType.pendingTrades);

      isOnPendingTrades
        ? this.fetchPendingData()
        : this.fetchCompletedData();
    },
    /**
     * Fetches data for completed trades
     */
    fetchCompletedData() {
      // this.loadingCompletedTradeDataPromise = this.$axios.get(URI.tradesCompleted);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingCompletedTradeDataPromise = Promise.resolve({ data: [
        {
          "TokenNAV" : {
            "productAmount" : 1.0800828190461012,
            "buyerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "productCode" : "USDJPY",
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "sellerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "paymentCurrency" : "USD",
            "creationDate" : "2020-03-20T23:12:14Z",
            "paymentAmount" : 160.27456183070403,
            "tradeId" : 1
          },
          "creationDate" : "2020-03-20T23:12:14Z",
          "tradeId" : 1
        }, {
          "TokenNAV" : {
            "productAmount" : 1.0800828190461012,
            "buyerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "productCode" : "USDJPY",
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "sellerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "paymentCurrency" : "USD",
            "creationDate" : "2020-03-20T23:12:14Z",
            "paymentAmount" : 1.6027456183070403,
            "tradeId" : 2
          },
          "creationDate" : "2020-03-20T23:12:14Z",
          "tradeId" : 2
        }
      ]});
      // --- END BLOCK ---

      this.loadingCompletedTradeDataPromise
        .then(({ data }) => {
          this.completedDataRaw = data;
        });
    },
    /**
     * Fetches data for pending trades
     */
    fetchPendingData() {
      // this.loadingPendingTradeDataPromise = this.$axios.get(URI.tradesPending);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingPendingTradeDataPromise = Promise.resolve({ data: [
        {
          "TokenNAV" : {
            "productAmount" : 1.0800828190461012,
            "buyerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "productCode" : "USDJPY",
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "sellerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "paymentCurrency" : "USD",
            "creationDate" : "2020-03-20T23:12:14Z",
            "paymentAmount" : 160.27456183070403,
            "tradeId" : 1
          },
          "creationDate" : "2020-03-20T23:12:14Z",
          "tradeId" : 1
        }, {
          "TokenNAV" : {
            "productAmount" : 1.0800828190461012,
            "buyerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "productCode" : "USDJPY",
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "sellerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "paymentCurrency" : "USD",
            "creationDate" : "2020-03-20T23:12:14Z",
            "paymentAmount" : 1.6027456183070403,
            "tradeId" : 2
          },
          "creationDate" : "2020-03-20T23:12:14Z",
          "tradeId" : 2
        }
      ]});
      // --- END BLOCK ---

      this.loadingPendingTradeDataPromise
        .then(({ data }) => {
          this.pendingDataRaw = data;
        });
    },
    /**
     * Opens a prompt to confirm trade cancellation
     * @param {Number} id
     */
    confirmCancelTrade(id) {
      this.$q.dialog({
        title: this.$t('fxCashTrade.cancelTradeConfirmTitle'),
        message: this.$t('fxCashTrade.cancelTradeConfirmLabel', { id }),
        cancel: true,
        persistent: true,
        focus: 'none',
      })
        .onOk(() => {
          this.successLabel = this.$t('fxCashTrade.cancelSuccessLabel');
          this.doPost(id, actionTypes.cancel);
        });
    },
    /**
     * Opens a prompt to confirm trade execution
     * @param {Number} id
     */
    confirmExecuteTrade(id) {
      this.$q.dialog({
        title: this.$t('fxCashTrade.executeTradeConfirmTitle'),
        message: this.$t('fxCashTrade.executeTradeConfirmLabel', { id }),
        cancel: true,
        persistent: true,
        focus: 'none',
      })
        .onOk(() => {
          this.successLabel = this.$t('fxCashTrade.executeSuccessLabel');
          this.doPost(id, actionTypes.execute);
        });
    },
    /**
     * Posts data to API.
     * URL to post to is dependent on action type.
     * @param {Number} id
     * @param {String} action - See action type
     */
    doPost(id, action) {
      const uri = (action === actionTypes.execute)
        ? URI.tradesExecute
        : URI.tradesCancel

      const postDataPromise = this.$axios.post(uri.replace('{id}', id));
      this.submissionPromise = postDataPromise;
      postDataPromise
        .then(() => {
          this.fetchCompletedData();
        });
    },
    /**
     * Handles input event for completed data.
     * Set val to raw completed data.
     * @param {Array<Object>} val
     */
    onCompletedDataInput(val) {
      this.CompletedDataRaw = val;
    },
    /**
     * Handles input event for pending data.
     * Set val to raw pending data.
     * @param {Array<Object>} val
     */
    onPendingDataInput(val) {
      this.pendingDataRaw = val;
    },
  },
}
</script>