<template>
  <PageLayout
    :is-loading="isLoading"
    :has-error="hasError"
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
      :data="data"

      :search-label="$t('fxTokenDataEntry.searchLabel')"
      :search-value.sync="searchValue"

      bordered
    />

    <!-- Dialogs -->
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import { routes } from 'src/config';

export default {
  name: 'FXTokenDataEntryHome',
  components: {
    PageLayout,
    DataTable,
  },
  data() {
    return {
      // TODO: proper definition
      columns: [
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
      ],
      data: [],
      searchValue: '',

      isLoading: false,
      hasError: false,
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
      this.data = [
        {
          id: 1,
          token: 'Token A',
        },
        {
          id: 2,
          token: 'Token B',
        },
      ]
    },
    onEnterSpotPriceClick() {
      this.$router.push({ name: routes.fxTokenDataEntryEnterSpotPrice.name })
    },
  },
}
</script>