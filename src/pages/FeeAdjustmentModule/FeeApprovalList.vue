<template>
  <PageLayout :title="$t('feeApprovalList.title')">
    <q-table
      v-if="pendingList && pendingList.length"
      :data="pendingList"
      :columns="columns"
      hide-header
      hide-bottom
      flat
      bordered
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="uploader" :props="props" :class="$style.uploaderCell">
            <span>{{ $t('feeApprovalList.newSchedule', { name: props.row.uploader }) }}</span>
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              flat
              :label="$t('feeApprovalList.review')"
              color="primary"
              class="text-no-wrap"
              @click="doShowDetails(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="row flex-center" v-else>
      <span>{{ $t('feeApprovalList.emptyListMessage') }}</span>
    </div>


    <!-- Dialogs -->
    <FeeAdjustmentDetailsDialog :details="shownDetails" :value="showDetailsDialog" @input="onShowDetailsDialogChange">
      <template v-slot:actions="{ id }">
        <q-space />
        <FeeAdjustmentApprovalActions
          :id="id"
          @change="onApprovalValueChange"
          @submit="onApprovalSubmit"
        />
      </template>
    </FeeAdjustmentDetailsDialog>

    <SubmissionDialog :state.sync="submissionState" :successTitle="successTitle" :successLabel="successLabel" />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import FeeAdjustmentDetailsDialog from 'src/components/FeeAdjustmentModule/FeeAdjustmentDetailsDialog';
import FeeAdjustmentApprovalActions from 'src/components/FeeAdjustmentModule/FeeAdjustmentApprovalActions';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI } from 'src/config';

export default {
  name: 'FeeApprovalList',
  mixins: [DirtyStateMixin],
  data() {
    return {
      // TODO: ensure columns are correct
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
      pendingList: [],
      showDetailsDialog: false,
      shownDetails: null,
      submissionState: null,
      successTitle: '',
      successLabel: '',
    };
  },
  created() {
    this.fetchPendingList();
  },
  methods: {
    /**
     * Fetches list of items awaiting approval.
     */
    fetchPendingList() {
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

      this.pendingList = [
        {
          uploader: 'JP Morgan',
          id: '1',
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
          id: '2',
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
     * Shows details dialog.
     *
     * @param {Object} details
     * @param {String} details.uploader
     * @param {String} details.id
     * @param {Object} details.data
     */
    doShowDetails(details) {
      // TODO: ensure the shape of details fits what's received from server
      // assumed shape: { uploader, id, data }
      this.shownDetails = details;
      this.showDetailsDialog = true;
    },
    /**
     * Hides details dialog.
     */
    doHideDetails() {
      this.showDetailsDialog = false;
    },
    /**
     * Sets goNext to contain a function that hides dialog when invoked
     * if event payload is false.
     * 
     * @param {Boolean} showDetailsDialog
     */
    onShowDetailsDialogChange(showDetailsDialog) {
      if (!showDetailsDialog) {
        const hideDetails = (shouldGoNext) => {
          if (shouldGoNext !== false) {
            this.doHideDetails();
          }
        };

        this.confirmLeaveIfDirty(hideDetails);
      }
    },
    /**
     * Event handler that is invoked when Approval Actions state has been changed.
     */
    onApprovalValueChange() {
      this.isDirty = true;
    },
    /**
     * Handles approval submission.
     * 
     * @param {Object} approvalObj
     * @param {String} approvalObj.id
     * @param {Boolean} approvalObj.isApproved
     * @param {String} approvalObj.reason
     */
    onApprovalSubmit(approvalObj) {
      this.submissionState = 'submitting';

      const approvalURI = approvalObj.isApproved ? URI.feeScheduleApprove : URI.feeScheduleDeny;
      this.$axios.post(
        approvalURI.replace('{id}', approvalObj.id),
        { reason: approvalObj.reason }
      )
        .then(() => {
          this.onSubmitSuccess(approvalObj.isApproved);
        })
        .catch(() => {
          this.onSubmitFailure();
        })
    },
    /**
     * Approval submission success handler
     * 
     * @param {Boolean} isApproved
     */
    onSubmitSuccess(isApproved) {
      this.successTitle = isApproved
        ? this.$t('feeApprovalList.approveSuccessTitle')
        : this.$t('feeApprovalList.rejectSuccessTitle');

      this.successLabel = isApproved
        ? this.$t('feeApprovalList.approveSuccessLabel')
        : this.$t('feeApprovalList.rejectSuccessLabel');

      this.submissionState = 'success';
      this.isDirty = false;

      this.doHideDetails();

      this.fetchPendingList();
    },
    /**
     * Approval submission failure handler
     */
    onSubmitFailure() {
      this.submissionState = 'failure';
    },
    /**
     * Override dirty state mixin's beforeRouteLeave hook
     * @override
     */
    preBeforeRouteLeave(_to, _from, next) {
      const hideDetailsAndLeave = (shouldGoNext) => {
        if (shouldGoNext !== false) {
          this.doHideDetails();
        }

        next(shouldGoNext);
      };

      this.confirmLeaveIfDirty(hideDetailsAndLeave);
    },
  },
  components: {
    PageLayout,
    FeeAdjustmentDetailsDialog,
    FeeAdjustmentApprovalActions,
    SubmissionDialog,
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
