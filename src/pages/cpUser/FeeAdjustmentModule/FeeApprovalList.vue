<template>
  <PageLayout title="Approval List">
    <q-table
      :data="approvalList"
      :columns="columns"
      hide-header
      hide-bottom
      flat
      bordered
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="uploader" :props="props" :class="$style.uploaderCell">
            <span>{{ `${props.row.uploader} has uploaded a new fee schedule` }}</span>
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              icon="mdi-eye-outline"
              label="View Details"
              color="primary"
              class="text-no-wrap"
              dense
              @click="doShowDetails(props.row.data)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <FeeAdjustmentDetailsDialog :data="shownData" :value="showDetailsDialog" @input="onShowDetailsDialogChange">
      <template v-slot:actions>
        <q-space />
        <FeeAdjustmentApprovalActions
          @change="onApprovalValueChange"
          @submit="onApprovalSubmit"
        />
      </template>
    </FeeAdjustmentDetailsDialog>

    <DirtyState v-model="goNext" :isDirty.sync="isDirty" />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import FeeAdjustmentDetailsDialog from 'src/components/FeeAdjustmentModule/FeeAdjustmentDetailsDialog';
import FeeAdjustmentApprovalActions from 'src/components/FeeAdjustmentModule/FeeAdjustmentApprovalActions';
import DirtyState from 'src/components/DirtyState';

export default {
  name: 'FeeApprovalList',
  data() {
    return {
      columns: [
        {
          name: 'uploader',
          require: true,
          align: 'left',
        },
        {
          name: 'actions',
          align: 'right',
        },
      ],
      approvalList: [],
      showDetailsDialog: false,
      shownData: null,
      goNext: null,
      isDirty: false,
    };
  },
  created() {
    this.fetchApprovalList();
  },
  methods: {
    /**
     * Fetches list of items awaiting approval
     */
    fetchApprovalList() {
      // TODO: proper fetch
  const jpmorganData = [
        {
          region: 'North America',
          productName: 'eqldx-US',
          productType: 'Mixed',
          currency: 'USD',
          brokerageAmount: '0.70',
          modification: 'New',
        },
        {
          region: 'EMEA',
          productName: 'eqldx-EUR-dj',
          productType: 'Future',
          currency: 'EUR',
          brokerageAmount: '0.60',
        },
      ];

      this.approvalList = [
        {
          uploader: 'JP Morgan',
          id: 1,
          data: [
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
            ...jpmorganData,
          ]
        },
        {
          uploader: 'Citigroup',
          id: 2,
          data: [
            {
              region: 'Asia',
              productName: 'eqldx-INR-CNX',
              productType: 'Mixed',
              currency: 'INR',
              brokerageAmount: '2.00',
              modification: 'New',
            },
          ]
        }
      ]
    },
    /**
     * Shows details dialog
     */
    doShowDetails(data) {
      this.shownData = data;
      this.showDetailsDialog = true;
    },
    /**
     * Hides details dialog
     */
    doHideDetails() {
      this.showDetailsDialog = false;
    },
    /**
     * Sets goNext to contain a function that hides dialog when invoked
     * if event payload is false
     */
    onShowDetailsDialogChange(showDetailsDialog) {
      if (!showDetailsDialog) {
        this.goNext = () => {
          this.doHideDetails();
        };
      }
    },
    onApprovalValueChange() {
      this.isDirty = true;
    },
    onApprovalSubmit(approved) {
      // TODO: proper submission
      // TODO: refetch after submission
    },
  },
  beforeRouteLeave(_to, _from, next) {
    this.goNext = () => {
      this.doHideDetails();
      next();
    };
  },
  components: {
    PageLayout,
    FeeAdjustmentDetailsDialog,
    FeeAdjustmentApprovalActions,
    DirtyState,
  },
}
</script>

<style lang="scss" module>
.uploaderCell {
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
