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
          :name="tabType.tx"
          :label="$t('fxTokenOpenPosition.txHistoryTab')"
        />
        <q-tab
          :name="tabType.nav"
          :label="$t('fxTokenOpenPosition.navHistoryTab')"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel
          :name="tabType.tx"
          class="q-px-none"
        >
          <!-- TX History -->
          <DataTable
            v-model="txHistoryData"
            :loading-data-promise="loadingTxHistoryDataPromise"
            :error-retry="boundFetchTxHistoryData"
            :columns="txHistoryColumns"

            :search-value.sync="searchValue"
            :select-value.sync="tokenSelectValue"
            :select-options="tokenSelectOptions"
          />
        </q-tab-panel>
        <q-tab-panel
          :name="tabType.nav"
          class="q-px-none"
        >
          <!-- NAV History -->
          <DataTable
            v-model="navHistoryData"
            :loading-data-promise="loadingNavHistoryDataPromise"
            :error-retry="boundFetchNavHistoryData"
            :columns="navHistoryColumns"

            :search-value.sync="searchValue"
            :select-value.sync="tokenSelectValue"
            :select-options="tokenSelectOptions"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </PageLayout>
</template>

<script>
import FormatCurrencyMixin from 'src/mixins/FormatCurrencyMixin';
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import { URI } from 'src/config';

const tabType = {
  tx: 'tx',
  nav: 'nav',
};

export default {
  name: 'FXTokenOpenPositionHistory',
  components: {
    PageLayout,
    DataTable,
  },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      tabType,
      tab: tabType.tx,
      id: '',

      // TODO: proper definition
      txHistoryColumns: [
        {
          name: 'tokenTransferId',
          label: 'Token Transfer ID',
          field: 'tokenTransferId',
          required: true,
          align: 'left',
        },
        {
          name: 'tokenCode',
          label: 'Token Code',
          field: 'tokenCode',
          required: true,
          align: 'left',
        },
        {
          name: 'amount',
          label: 'Amount',
          field: 'amount',
          required: true,
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              'USD', // TODO: currency should be provided by API
              val,
            );
          },
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
          name: 'fromAddress',
          label: 'From Address',
          field: 'fromAddress',
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
        {
          name: 'toAddress',
          label: 'To Address',
          field: 'toAddress',
          required: true,
          align: 'left',
        },
      ],

      navHistoryColumns: [
        {
          name: 'tokenCode',
          label: 'Token Code',
          field: 'tokenCode',
          required: true,
          align: 'left',
        },
        {
          name: 'dataEntryAddress',
          label: 'Data Entry Address',
          field: 'dataEntryAddress',
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
          name: 'creationDate',
          label: 'Creation Date',
          field: 'creationDate',
          required: true,
          align: 'left',
        },
        {
          name: 'navValueAmount',
          label: 'NAV Value Amount',
          field: 'navValueAmount',
          required: true,
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              row.navValueCurrency,
              val,
            );
          },
          align: 'left',
        },
      ],

      loadingTxHistoryDataPromise: null,
      loadingNavHistoryDataPromise: null,
      txHistoryData: [],
      navHistoryData: [],

      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: [ //TODO: proper definition
        '123',
        '456',
      ],
    };
  },
  watch: {
    tab() {
      const { id, type } = this.$route.query;

      if (id === this.id && type === this.tab) {
        return;
      }

      this.$router.replace({
        query: {
          type: this.tab,
          id: this.id,
        }
      });

      this.fetchCurrentTabData();
    },
  },
  created() {
    this.boundFetchTxHistoryData = () => {
      this.fetchTxHistoryData();
    };

    this.boundFetchNavHistoryData = () => {
      this.fetchNavHistoryData();
    };

    const { id, type } = this.$route.query;

    this.tab = (type == tabType.nav)
      ? type
      : tabType.tx;

    this.id = id;

    this.fetchCurrentTabData();
  },
  methods: {
    /**
     * Fetches TX history data
     */
    fetchTxHistoryData() {
      // this.loadingTxHistoryDataPromise = this.$axios.get(URI.fxTokenTxHistoryOpen);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingTxHistoryDataPromise = Promise.resolve({ data: [
        {
          "TokenTransfer" : {
            "tokenCode" : "USDE",
            "amount" : 10.800828190461012,
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "fromAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "creationDate" : "2020-03-20T23:12:14Z",
            "toAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540"
          },
          "creationDate" : "2020-03-20T23:12:14Z",
          "tokenTransferId" : 1
        },
        {
          "TokenTransfer" : {
            "tokenCode" : "USDE",
            "amount" : 108.00828190461012,
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "fromAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "creationDate" : "2020-03-20T23:12:14Z",
            "toAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540"
          },
          "creationDate" : "2020-03-20T23:12:14Z",
          "tokenTransferId" : 2
        },
      ]});
      // --- END BLOCK ---

      this.loadingTxHistoryDataPromise
        .then(({ data }) => {
          this.txHistoryData = data.map(item => {
            return { // flatten data
              tokenTransferId: item.tokenTransferId,
              ...item.TokenTransfer,
            };
          });;
        });
    },
    /**
     * Fetches NAV history data
     */
    fetchNavHistoryData() {
      // this.loadingNavHistoryDataPromise = this.$axios.get(URI.fxTokenNavHistoryOpen);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingNavHistoryDataPromise = Promise.resolve({ data: [
        {
          "tokenCode" : "USDJPY",
          "dataEntryAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
          "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
          "creationDate" : "2020-03-20T23:12:14Z",
          "navValueCurrency" : "USD",
          "navValueAmount" : 1080.0828190461012
        },
        {
          "tokenCode" : "USDJPY",
          "dataEntryAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
          "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
          "creationDate" : "2020-03-20T23:12:14Z",
          "navValueCurrency" : "USD",
          "navValueAmount" : 108008.28190461012
        },
      ]});
      // --- END BLOCK ---

      this.loadingNavHistoryDataPromise
        .then(({ data }) => {
          this.navHistoryData = data;
        });
    },
    /**
     * Fetches data depending on which tab user is on.
     */
    fetchCurrentTabData() {
      const { type } = this.$route.query;
      const isOnNavHistory = (type == tabType.nav);

      isOnNavHistory
        ? this.fetchNavHistoryData()
        : this.fetchTxHistoryData();
    },
  },
}
</script>

<style lang="scss" module>
</style>
