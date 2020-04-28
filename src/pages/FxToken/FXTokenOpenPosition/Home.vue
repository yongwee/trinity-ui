<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchData"
  >
    <div class="q-mb-md">
      <q-btn
        :label="$t('fxTokenOpenPosition.createToken')"
        color="primary"
        @click="onCreateTokenClick"
      />
    </div>

    <DataTable
      :value="data"
      :columns="columns"
      :search-label="$t('fxTokenOpenPosition.search')"
      :select-label="$t('fxTokenOpenPosition.tokenSelectLabel')"

      :search-value.sync="searchValue"
      :select-value.sync="tokenSelectValue"
      :select-options="tokenSelectOptions"

      bordered
    >
      <template v-slot:body-cell-actions="props">
        <q-td
          key="actions"
          :props="props"
        >
          <q-btn
            flat
            color="primary"
            label="TX History"
            @click="goToHistory('tx', props.row.id)"
          />
          <q-btn
            flat
            color="primary"
            label="NAV History"
            @click="goToHistory('nav', props.row.id)"
          />
        </q-td>
      </template>
    </DataTable>
  </PageLayout>
</template>

<script>
import FormatCurrencyMixin from 'src/mixins/FormatCurrencyMixin';
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import { URI, routes } from 'src/config';

export default {
  name: 'FXTokenOpenPositionHome',
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
          name: 'baseCashTokenId',
          label: 'Base Cash Token ID',
          field: 'baseCashTokenId',
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
              row.underlying,
              val,
            );
          },
          align: 'left',
        },
        {
          name: 'issuerAddress',
          label: 'Issuer Address',
          field: 'issuerAddress',
          required: true,
          align: 'left',
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
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
          name: 'tokenType',
          label: 'Token Type',
          field: 'tokenType',
          required: true,
          align: 'left',
        },
        {
          name: 'underlying',
          label: 'Underlying',
          field: 'underlying',
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
          name: 'currencyCode',
          label: 'Currency Code',
          field: 'currencyCode',
          required: true,
          align: 'left',
        },
        {
          name: 'spTokenCode',
          label: 'SP Token Code',
          field: 'spTokenCode',
          required: true,
          align: 'left',
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'right',
          headerStyle: 'padding-right: 32px',
        },
      ],
      data: [],
      loadingDataPromise: null,
      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: ['asdf', 'zxcvzx'],
    };
  },
  created() {
    this.boundFetchData = () => {
      this.fetchData();
    };

    this.fetchData();
  },
  methods: {
    fetchData() {
      // this.loadingDataPromise = this.$axios.get(URI.fxTokenOpen);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: [
        {
          "BaseCashToken" : {
            "tokenCode" : "JPY1",
            "amount" : 1.0800828190461012,
            "issuerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "description" : "this represents the underlying FX tokens for accumulators only",
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "underlying" : "JPY",
            "tokenType" : "FX Token",
            "creationDate" : "2020-03-20T23:12:14Z",
            "currencyCode" : "840",
            "spTokenCode" : "ABCUSDJPY1"
          },
          "baseCashTokenId" : 1,
          "creationDate" : "2020-03-20T23:12:14Z"
        },
        {
          "BaseCashToken" : {
            "tokenCode" : "JPY1",
            "amount" : 1.0800828190461012,
            "issuerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "description" : "this represents the underlying FX tokens for accumulators only",
            "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
            "underlying" : "JPY",
            "tokenType" : "FX Token",
            "creationDate" : "2020-03-20T23:12:14Z",
            "currencyCode" : "840",
            "spTokenCode" : "ABCUSDJPY1"
          },
          "baseCashTokenId" : 2,
          "creationDate" : "2020-03-20T23:12:14Z"
        },
      ]});
      // --- END BLOCK ---

      this.loadingDataPromise
        .then(({ data }) => {
          this.data = data.map(item => {
            return { // flatten data
              baseCashTokenId: item.baseCashTokenId,
              ...item.BaseCashToken,
            }
          });
        });
    },
    onCreateTokenClick() {
      this.$router.push({ name: routes.fxTokenOpenPositionCreateToken.name });
    },
    goToHistory(type, id) {
      this.$router.push({ name: routes.fxTokenOpenPositionHistory.name, query: { type, id } });
    }
  },
}
</script>

<style lang="scss" module>
</style>
