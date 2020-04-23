<template>
  <PageLayout>
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
      :data="data"
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
    <q-dialog v-model="viewTokenDialogOpen">
      <q-card
        v-if="viewTokenData"
        :class="$style.dialogContainer"
      >
        <q-card-section class="row items-center justify-between">
          <span class="text-h6">View {{ viewTokenData.tokenCode }}</span>
          <q-btn
            v-close-popup
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>

        <q-list class="q-dialog__message">
          <q-item
            v-for="row in viewTokenRows"
            :key="row.field"
          >
            <q-item-section
              side
              :class="$style.dialogLabel"
            >
              {{ row.label }}
            </q-item-section>
            <q-item-section>{{ viewTokenData[row.field] }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

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
import TransferTokenDialog from './TransferTokenDialog';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { routes, URI } from 'src/config';

export default {
  name: 'BaseCashTokenHome',
  components: {
    PageLayout,
    DataTable,
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
      data: [],
      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: ['Token 1', 'Token 2'],

      viewTokenDialogOpen: false,
      viewTokenData: null,
      viewTokenRows: [ // Field should match keys in data/token
        {
          label: 'Token Code',
          field: 'tokenCode',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Amount',
          field: 'amount',
        },
      ],

      transferTokenDialogOpen: false,

      submissionPromise: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // TODO: proper fetch
      this.data = [
        {
          tokenCode: 'Token A',
        },
        {
          tokenCode: 'Token B',
        },
      ]
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
      this.viewTokenData = {
        tokenCode,
        description: 'token description',
        amount: Math.random() * 1000000,
      };

      this.viewTokenDialogOpen = true;
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
.dialogContainer {
  min-width: 350px;
}

.dialogLabel {
  width: 120px;
}
</style>
