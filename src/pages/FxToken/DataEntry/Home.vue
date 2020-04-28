<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchData"
  >
    <div class="q-mb-md">
      <q-btn
        :label="$t('fxTokenDataEntry.enterSpotPriceBtnLabel')"
        color="primary"
        @click="onEnterSpotPriceClick"
      />
    </div>

    <DataTable
      :columns="columns"
      :value="data"

      :search-label="$t('fxTokenDataEntry.searchLabel')"
      :search-value.sync="searchValue"

      bordered
    />

    <!-- Dialogs -->
  </PageLayout>
</template>

<script>
import FormatCurrencyMixin from 'src/mixins/FormatCurrencyMixin';
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import { routes, URI } from 'src/config';

export default {
  name: 'FXTokenDataEntryHome',
  components: {
    PageLayout,
    DataTable,
  },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      loadingDataPromise: null,

      // TODO: proper definition
      columns: [
        {
          name: 'tokenCode',
          label: 'Token Code',
          field: 'tokenCode',
          require: true,
          align: 'left',
        },
        {
          name: 'dataEntryAddress',
          label: 'Data Entry Address',
          field: 'dataEntryAddress',
          require: true,
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
          require: true,
          align: 'left',
        },
        {
          name: 'navValueAmount',
          label: 'NAV Value Amount',
          field: 'navValueAmount',
          require: true,
          format: (val, row) => {
            return this.formatCurrency(
              this.$i18n.locale,
              row.navValueCurrency,
              val
            );
          },
          align: 'left',
        },
      ],
      data: [],
      searchValue: '',
    };
  },
  created() {
    this.fetchData();

    this.boundFetchData = () => {
      this.fetchData();
    };
  },
  methods: {
    fetchData() {
      // TODO: proper fetch
      // this.loadingDataPromise = this.$axios.get(URI.fxTokenNavHistory)
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: [{
        "tokenCode" : "USDJPY",
        "dataEntryAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
        "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
        "creationDate" : "2020-03-20T23:12:14Z",
        "navValueCurrency" : "USD",
        "navValueAmount" : 1.0800828190461012
      }, {
        "tokenCode" : "USDJPY",
        "dataEntryAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
        "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
        "creationDate" : "2020-03-20T23:12:14Z",
        "navValueCurrency" : "USD",
        "navValueAmount" : 1.0800828190461012
      }]});
      // --- END BLOCK ---

      this.loadingDataPromise
        .then(({ data }) => {
          this.data = data;
        });
    },
    onEnterSpotPriceClick() {
      this.$router.push({ name: routes.fxTokenDataEntryEnterSpotPrice.name })
    },
  },
}
</script>