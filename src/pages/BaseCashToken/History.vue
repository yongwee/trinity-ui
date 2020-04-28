<template>
  <PageLayout
    :title-format-config="titleFormatConfig"
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchData"
  >
    <DataTable
      :value="data"
      :columns="columns"

      :search-value.sync="searchValue"

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
  name: 'BaseCaseTokenHistory',
  components: {
    PageLayout,
    DataTable,
  },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      loadingDataPromise: null,

      columns: [
        {
          name: 'tokenTransferId',
          label: 'Token Transfer ID',
          field: 'tokenTransferId',
          align: 'left',
        },
        {
          name: 'amount',
          label: 'Amount',
          field: 'amount',
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              //TODO: currency should be provided by API
              'USD',
              val
            );
          },
          align: 'left',
        },
        {
          name: 'txId',
          label: 'TX ID',
          field: 'txId',
          align: 'left',
        },
        {
          name: 'fromAddress',
          label: 'From Address',
          field: 'fromAddress',
          align: 'left',
        },
        {
          name: 'creationDate',
          label: 'Creation Date',
          field: 'creationDate',
          align: 'left',
        },
        {
          name: 'toAddress',
          label: 'To Address',
          field: 'toAddress',
          align: 'left',
        },
      ],
      dataRaw: [],
      searchValue: '',
    }
  },
  computed: {
    titleFormatConfig() {
      return { tokenCode: this.tokenCode };
    },
    tokenCode() {
      return this.$route.query.tokenCode || '';
    },
    data() {
      return this.dataRaw.map(item => {
        return {
          tokenTransferId: item.tokenTransferId,
          ...item.TokenTransfer,
        };
      });
    },
  },
  created() {
    this.boundFetchData = () => {
      this.fetchData();
    };

    this.fetchData();
  },
  methods: {
    /**
     * Fetches data based on token code grabbed from query params
     */
    fetchData() {
      // this.loadingDataPromise = this.$axios.get(URI.baseCashTokenTransferHistoryByTokenCode.replace('{tokenCode}', this.tokenCode));
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: [
        {
          "TokenTransfer" : {
            "tokenCode" : "USDE",
            "amount" : 1.0800828190461012,
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "fromAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "creationDate" : "2020-03-20T23:12:14Z",
            "toAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540"
          },
          "creationDate" : "2020-03-20T23:12:14Z",
          "tokenTransferId" : 1
        }, {
          "TokenTransfer" : {
            "tokenCode" : "USDE",
            "amount" : 1080.0828190461012,
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "fromAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "creationDate" : "2020-03-20T23:12:14Z",
            "toAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540"
          },
          "creationDate" : "2020-03-20T23:12:14Z",
          "tokenTransferId" : 1
        },
      ]});
      // --- END BLOCK ---
      this.loadingDataPromise
        .then(({ data }) => {
          this.dataRaw = data;
        });
    }
  },
}
</script>