<template>
  <PageLayout
    :title-format-config="titleFormatConfig"
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchData"
  >
    <DataTable
      :data="data"
      :columns="columns"

      :search-value.sync="searchValue"

      bordered
    />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import { URI } from 'src/config';

export default {
  name: 'BaseCaseTokenHistory',
  components: {
    PageLayout,
    DataTable,
  },
  data() {
    return {
      loadingDataPromise: null,

      columns: [
        {
          name: 'investorAccount',
          label: 'Investor Account',
          field: 'investorAccount',
          align: 'left',
        },
        {
          name: 'amount',
          label: 'Amount',
          field: 'amount',
          align: 'left',
        },
      ],
      data: [],
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
      this.loadingDataPromise = this.$axios.get(URI.baseCashTokenTransferHistoryById.replace('{id}', this.tokenCode));
      this.loadingDataPromise
        .then(res => {
          this.data = res.data;
        });
    }
  },
}
</script>