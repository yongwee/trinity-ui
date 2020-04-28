<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchData"
  >
    <q-btn
      class="q-mb-md"
      color="primary"
      :label="$t('spToken.createToken')"
      @click="onCreateTokenClick"
    />

    <DataTable
      v-model="data"
      :columns="columns"

      :search-value.sync="searchValue"
      :select-value.sync="tokenSelectValue"
      :select-options="tokenSelectOptions"

      :select-label="$t('spToken.selectLabel')"

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
            label="View Token"
            @click="viewToken(props.row.tokenCode)"
          />
        </q-td>
      </template>
    </DataTable>


    <!-- Dialogs -->
    <ViewTokenDialog v-model="viewTokenDialogTokenCode" />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import ViewTokenDialog from './ViewTokenDialog';
import { URI, routes } from 'src/config';

export default {
  name: 'SPTokenHome',
  components: {
    PageLayout,
    DataTable,
    ViewTokenDialog,
  },
  data() {
    return {
      // TODO: proper definition
      columns: [
        {
          name: 'tokenName',
          label: 'Token Name',
          field: 'tokenName',
          required: true,
          align: 'left',
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          require: true,
          align: 'left',
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'right',
          headerStyle: 'padding-right: 32px',
        },
      ],
      loadingDataPromise: null,
      data: [],
      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: ['Token 1', 'Token 2'],

      viewTokenDialogTokenCode: null,
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
      // this.loadingDataPromise = this.$axios(URI.spToken);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: [
        {
          tokenCode: 'USDA',
          tokenName: 'Token USDA',
          description: 'Token USDA description',
        },
        {
          tokenCode: 'USDB',
          tokenName: 'Token USDB',
          description: 'Token USDB description',
        },
      ]});
      // --- END BLOCK ---

      this.loadingDataPromise
        .then(({ data }) => {
          this.data = data;
        })
    },
    onCreateTokenClick() {
      this.$router.push({ name: routes.spTokenCreateToken.name });
    },
    viewToken(tokenCode) {
      this.viewTokenDialogTokenCode = tokenCode;
    }
  },
}
</script>

<style lang="scss" module>
</style>
