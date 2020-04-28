<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchData"
  >
    <DataTable
      :value="data"
      :columns="columns"

      :search-value.sync="searchValue"
      :select-value.sync="investorSelectValue"
      :select-options="investorSelectOptions"

      :select-label="$t('investorRisk.selectLabel')"

      bordered
    />
  </PageLayout>
</template>

<script>
import FormatCurrencyMixin from 'src/mixins/FormatCurrencyMixin';
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import { URI } from 'src/config';

export default {
  name: 'InvestorRisk',
  components: {
    PageLayout,
    DataTable,
  },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      // TODO: proper definition
      columns: [
        {
          name: 'tradeId',
          label: 'Trade ID',
          field: 'tradeId',
          require: true,
          align: 'left',
        },
        {
          name: 'investedAmount',
          label: 'Invested Amount',
          field: 'InvestedAmount',
          require: true,
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              row.InvestedCurrency,
              val);
          },
          align: 'left',
        },
        {
          name: 'openSPTokenNAVAmount',
          label: 'Open SP Token NAV Amount',
          field: 'OpenSPTokenNAVAmount',
          require: true,
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              row.OpenSPTokenNAVCurrency,
              val);
          },
          align: 'left',
        },
        {
          name: 'baseCashTokenBalanceAmount',
          label: 'Base Cash Token Balance Amount',
          field: 'BaseCashTokenBalanceAmount',
          require: true,
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              row.BaseCashTokenBalanceCurrency,
              val);
          },
          align: 'left',
        },
      ],
      loadingDataPromise: null,
      dataRaw: [],
      searchValue: '',
      investorSelectValue: '',
      investorSelectOptions: ['Xiaoming', 'Xiaohua'],
    };
  },
  computed: {
    data() {
      return this.dataRaw.map(item => {
        return {
          tradeId: item.tradeId,
          ...item.TokenNAV
        };
      });
    },
  },
  created() {
    this.boundFetchData = () => {
      this.fetchData();
    }

    this.fetchData();
  },
  methods: {
    fetchData() {
      // TODO: proper fetch
      // this.loadingDataPromise = this.$axios.get(URI.riskInvestor);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: [{
        "TokenNAV" : {
          "OpenSPTokenNAVCurrency" : "USD",
          "InvestedAmount" : 10800.828190461012,
          "InvestedCurrency" : "USD",
          "BaseCashTokenBalanceAmount" : 16027.456183070403,
          "BaseCashTokenBalanceCurrency" : "USD",
          "OpenSPTokenNAVAmount" : 11465.812980502945,
          "calculationDate" : "2020-03-20T23:12:14Z"
        },
        "creationDate" : "2020-03-20T23:12:14Z",
        "tradeId" : 1
      }, {
        "TokenNAV" : {
          "OpenSPTokenNAVCurrency" : "USD",
          "InvestedAmount" : 1080.0828190461012,
          "InvestedCurrency" : "USD",
          "BaseCashTokenBalanceAmount" : 1602.7456183070403,
          "BaseCashTokenBalanceCurrency" : "USD",
          "OpenSPTokenNAVAmount" : 1146.5812980502945,
          "calculationDate" : "2020-03-20T23:12:14Z"
        },
        "creationDate" : "2020-03-20T23:12:14Z",
        "tradeId" : 2
      }]});
      // --- END BLOCK ---

      this.loadingDataPromise
        .then(({ data }) => {
          this.dataRaw = data;
        });
    },
  }
}
</script>