<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchData"
  >
    <div class="q-mb-md row items-center">
      <q-btn
        class="q-mr-sm"
        color="primary"
        :label="$t('baseCashToken.createToken')"
        @click="onCreateTokenClick"
      />

      <q-btn
        color="primary"
        :label="$t('baseCashToken.transferToken')"
        @click="openTransferTokenDialog"
      />
    </div>

    <DataTable
      :value="data"
      :columns="columns"

      :search-value.sync="searchValue"
      :select-value.sync="tokenSelectValue"
      :select-options="tokenSelectOptions"

      :select-label="$t('baseCashToken.selectLabel')"

      bordered
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="tokenCode"
            :props="props"
          >
            {{ props.row.tokenCode }}
          </q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <q-btn
              flat
              color="primary"
              :label="$t('baseCashToken.viewDetailsBtn')"
              @click="viewDetails(props.row.tokenCode)"
            />
            <q-btn
              flat
              color="primary"
              :label="$t('baseCashToken.viewTransferHistoryBtn')"
              @click="viewHistory(props.row.tokenCode)"
            />
          </q-td>
        </q-tr>
      </template>
    </DataTable>


    <!-- Dialogs -->
    <ViewTokenDialog v-model="viewTokenDialogTokenCode" />

    <TransferTokenDialog
      :value="transferTokenDialogOpen"
      @change="onTransferTokenChange"
      @input="onTransferTokenInput"
      @submit="onTransferTokenSubmit"
    />

    <SubmissionDialog :submission-promise="submissionPromise" />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';
import ViewTokenDialog from './ViewTokenDialog';
import TransferTokenDialog from './TransferTokenDialog';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { routes, URI } from 'src/config';

export default {
  name: 'BaseCashTokenHome',
  components: {
    PageLayout,
    DataTable,
    ViewTokenDialog,
    TransferTokenDialog,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      // TODO: proper definition
      columns: [
        {
          name: 'tokenCode',
          label: 'Token Code',
          field: 'tokenCode',
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
      loadingDataPromise: null,
      data: [],
      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: ['Token 1', 'Token 2'],

      viewTokenDialogTokenCode: null,

      transferTokenDialogOpen: false,

      submissionPromise: null,
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
      // this.loadingDataPromise = this.$axios.get(URI.baseCashToken);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: [
        {
          "tokenCode" : "USDE",
          "amount" : 1.0800828190461012,
          "issuerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
          "description" : "this represents fiat currency for accumulators only",
          "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
          "underlying" : "USD",
          "tokenType" : "BaseCash",
          "creationDate" : "2020-03-20T23:12:14Z",
          "currencyCode" : "840"
        }, {
          "tokenCode" : "USDF",
          "amount" : 1.0800828190461012,
          "issuerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
          "description" : "this represents fiat currency for accumulators only",
          "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
          "underlying" : "USD",
          "tokenType" : "BaseCash",
          "creationDate" : "2020-03-20T23:12:14Z",
          "currencyCode" : "840"
        }
      ]});
      // --- END BLOCK ---

      this.loadingDataPromise
        .then(({ data }) => {
          this.data = data;
        });
    },
    /**
     * Event handler for create token button click.
     * Brings user to create token page.
     */
    onCreateTokenClick() {
      this.$router.push({ name: routes.baseCashTokenCreateToken.name });
    },
    /**
     * Opens transfer token dialog.
     */
    openTransferTokenDialog() {
      this.transferTokenDialogOpen = true;
    },
    /**
     * Event handler for when input value changes within transfer token dialog.
     */
    onTransferTokenChange() {
      this.isDirty = true;
    },
    /**
     * Event handler for when open state of transfer token dialog is changed from internally.
     * @param {Boolean} dialogOpen - dialog is to be opened
     */
    onTransferTokenInput(dialogOpen) {
      if (!dialogOpen) {
        return this.confirmLeaveIfDirty((shouldClose) => {
          this.transferTokenDialogOpen =  shouldClose
            ? false
            : true;
        })
      }

      this.transferTokenDialogOpen = dialogOpen;
    },
    /**
     * Handles submission of transfer token.
     * @param {Object} payload
     */
    onTransferTokenSubmit(payload) {
      const postDataPromise = this.$axios.post(URI.baseCashTokenTransfer, payload)
      this.submissionPromise = postDataPromise;

      postDataPromise
        .then(() => {
          this.isDirty = false;
          this.transferTokenDialogOpen = false;
        });
    },
    /**
     * Open view details dialog.
     * @param {String} tokenCode
     */
    viewDetails(tokenCode) {
      this.viewTokenDialogTokenCode = tokenCode;
    },
    /**
     * Opens history page
     * @param {String} tokenCode
     */
    viewHistory(tokenCode) {
      this.$router.push({
        name: routes.baseCashTokenHistory.name,
        query: {
          tokenCode,
        }
      });
    },
  },
}
</script>

<style lang="scss" module>
</style>
