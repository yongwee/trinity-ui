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
            :data="completedData"
            :columns="completedColumns"
            :loading-data-promise="loadingCompletedTradeDataPromise"
            :error-retry="boundFetchCompletedData"

            :search-value.sync="searchValue"
          />
        </q-tab-panel>

        <!-- Pending Trades -->
        <q-tab-panel
          :name="tabType.pendingTrades"
          class="q-px-none"
        >
          <DataTable
            :data="pendingData"
            :columns="pendingColumns"
            :loading-data-promise="loadingPendingTradeDataPromise"
            :error-retry="boundFetchPendingData"

            :search-value.sync="searchValue"
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  flat
                  color="primary"
                  label="Cancel Trade"
                  @click="confirmCancelTrade(props.row.id)"
                />
                <q-btn
                  flat
                  color="primary"
                  label="Execute Trade"
                  @click="confirmExecuteTrade(props.row.id)"
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
    name: 'id',
    label: 'ID',
    field: 'id',
    required: true,
    align: 'left',
  },
  {
    name: 'token',
    label: 'Token',
    field: 'token',
    require: true,
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
  data() {
    return {
      tabType,
      tab: tabType.completedTrades,

      // TODO: proper definition
      completedColumns: [...sharedColumns],
      pendingColumns: [
        ...sharedColumns,
        {
          name: 'actions',
          label: 'Actions',
          align: 'right',
        }
      ],
      completedData: [],
      pendingData: [],

      searchValue: '',

      submissionPromise: null,
      successLabel: null,

      loadingCompletedTradeDataPromise: null,
      loadingPendingTradeDataPromise: null,
    };
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
      // TODO: proper fetch
      this.loadingCompletedTradeDataPromise = Promise.resolve({ data: [
        {
          id: 1,
          token: 'Token A',
        },
        {
          id: 2,
          token: 'Token B',
        },
      ]});

      this.loadingCompletedTradeDataPromise
        .then(({ data }) => {
          this.completedData = data;
        });
    },
    /**
     * Fetches data for pending trades
     */
    fetchPendingData() {
      // TODO: proper fetch
      this.loadingPendingTradeDataPromise = Promise.resolve({ data: [
        {
          id: 1,
          token: 'Token A',
        },
        {
          id: 2,
          token: 'Token B',
        },
      ]});

      this.loadingPendingTradeDataPromise
        .then(({ data }) => {
          this.pendingData = data;
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
  },
}
</script>