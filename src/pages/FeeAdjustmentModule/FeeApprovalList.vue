<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchAll"
  >
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
          <q-td
            key="uploader"
            :props="props"
            :class="$style.uploaderCell"
          >
            <span>{{ $t('feeApprovalList.newSchedule', { name: getBrokerName(props.row.feeScheduleBrokerId) }) }}</span>
          </q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <q-btn
              flat
              :label="$t('feeApprovalList.review')"
              color="primary"
              class="text-no-wrap"
              @click="doShowDetails(props.row.feeScheduleId, props.row.version)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div
      v-else
      class="row flex-center"
    >
      <span>{{ $t('feeApprovalList.emptyListMessage') }}</span>
    </div>


    <!-- Dialogs -->
    <FeeAdjustmentDetailsDialog
      :details="shownDetails"
      :value="showDetailsDialog"
      show-modification
      :error-retry="showDetailsErrorRetry"
      @input="onShowDetailsDialogChange"
    >
      <template v-slot:actions="{ id }">
        <q-space />
        <FeeAdjustmentApprovalActions
          v-if="id"
          :id="id"
          @change="onApprovalValueChange"
          @submit="onApprovalSubmit"
        />
      </template>
    </FeeAdjustmentDetailsDialog>

    <SubmissionDialog
      :submission-promise="submissionPromise"
      :success-title="successTitle"
      :success-label="successLabel"
      @successOk="onSuccessOk"
    />
  </PageLayout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PageLayout from 'src/components/PageLayout';
import FeeAdjustmentDetailsDialog from 'src/components/FeeAdjustmentModule/FeeAdjustmentDetailsDialog';
import FeeAdjustmentApprovalActions from 'src/components/FeeAdjustmentModule/FeeAdjustmentApprovalActions';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI } from 'src/config';

export default {
  name: 'FeeApprovalList',
  components: {
    PageLayout,
    FeeAdjustmentDetailsDialog,
    FeeAdjustmentApprovalActions,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      loadingDataPromise: null,

      // TODO: ensure columns are correct
      columns: [
        {
          name: 'uploader',
          field: 'feeScheduleBrokerId',
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
      showDetailsErrorRetry: null,
      shownDetails: null,

      submissionPromise: null,
      successTitle: '',
      successLabel: '',
    };
  },
  computed: {
    ...mapState({
      brokers: state => state.business.brokers,
    }),
    /**
     * Map of broker id to broker data
     * e.g. { brokerId: brokerData }
     */
    brokerMap() {
      const brokerMap = {};

      if (!this.brokers) {
        return brokerMap;
      }

      for (const broker of Object.values(this.brokers)) {
        brokerMap[broker.brokerMapId] = broker;
      }

      return brokerMap;
    },
  },
  created() {
    this.fetchAll();

    // Meant for passing into other components to be called
    this.boundFetchAll = () => {
      return this.fetchAll();
    };
  },
  methods: {
    ...mapActions({
      fetchBrokers: 'business/fetchBrokers',
    }),
    /**
     * Fetches pending items and broker data
     */
    fetchAll() {
      this.loadingDataPromise = Promise.all([
        this.fetchBrokers(),
        this.fetchPendingList(),
      ]);
    },
    /**
     * Fetches list of items awaiting approval.
     */
    fetchPendingList() {
      return this.$axios.get(URI.feeSchedulePending)
        .then(res => {
          this.pendingList = res.data;
        });
    },
    /**
     * Gets broker coy name + code given an id
     *
     * @param {Number} id
     */
    getBrokerName(id) {
      const { exBrokerCode, cpBrokerCode } = this.brokerMap[id];
      return `${exBrokerCode} — ${cpBrokerCode}`;
    },
    /**
     * Shows details dialog.
     *
     * @param {Object} details
     * @param {String} details.uploader
     * @param {String} details.id
     * @param {Object} details.data
     */
    doShowDetails(id, version) {
      const fetchDetails = () => {
        this.showDetailsDialog = true;
        this.showDetailsErrorRetry = null;
        this.shownDetails = null;

        this.$axios.get(URI.feeSchedulePendingIndividual.replace('{id}', id))
          .then(({ data }) => {
            this.shownDetails = {
              id,
              showAllRowsAsModified: version === 1,
              data,
            };
          })
          .catch(() => {
            this.showDetailsErrorRetry = fetchDetails;
          });
      }

      fetchDetails();
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
      const approvalURI = approvalObj.isApproved ? URI.feeScheduleApprove : URI.feeScheduleReject;

      const formData = new FormData();
      formData.append('reason', approvalObj.reason);

      const postDataPromise = this.$axios.post(
        approvalURI.replace('{id}', approvalObj.id),
        formData,
      );
      this.submissionPromise = postDataPromise;
      postDataPromise
        .then(() => {
          this.onSubmitSuccess(approvalObj.isApproved);
        });
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

      this.isDirty = false;

      this.doHideDetails();
    },
    /**
     * Handles clicking on 'OK' of submission success dialog
     */
    onSuccessOk() {
      // Do this here instead of inside onSubmitSuccess so that the
      // change of loading state will not cause dialog to close
      this.fetchAll();
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
