<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchAll"
  >
    <q-list
      v-if="history && history.length"
      bordered
      class="rounded-borders"
    >
      <template v-for="(entry, i) in history">
        <q-expansion-item
          :key="entry.id"
          expand-icon-toggle
        >
          <template v-slot:header>
            <q-item-section>
              <div class="row items-center">
                {{ entry.brokerCodePair }}
                <q-space />
                <FeeAdjustmentHistoryDownloadBtn :broker-id="entry.brokerId" />
                <q-btn
                  flat
                  color="primary"
                  :label="$t('feeHistory.viewDetails')"
                  @click="doShowDetails(entry.brokerId)"
                />
              </div>
            </q-item-section>
          </template>

          <q-list>
            <q-item
              v-for="(item, j) in entry.items"
              :key="j"
              :inset-level="1"
            >
              <q-item-section>
                <div class="row items-center">
                  <span class="text-grey-8">{{ $t('feeHistory.versionLabel', { version: item.version }) }}</span>
                  <q-space />
                  <q-badge
                    :color="item.approved ? 'positive' : 'negative'"
                    class="text-weight-bold q-pa-xs q-mr-lg"
                  >
                    {{ item.approved
                      ? $t('feeHistory.approved')
                      : $t('feeHistory.rejected')
                    }}
                  </q-badge>

                  <q-btn
                    color="secondary"
                    flat
                    :label="$t('feeHistory.viewReason')"
                    @click="doShowReason(item.approved, item.reason)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-separator
          v-if="i < (history.length - 1)"
          :key="`sep-${i}`"
        />
      </template>
    </q-list>

    <div
      v-else
      class="row flex-center"
    >
      <span>{{ $t('feeHistory.emptyHistoryMessage') }}</span>
    </div>


    <!-- dialogs -->

    <FeeAdjustmentDetailsDialog
      v-model="showDetailsDialog"
      :details="shownDetails"
      :error-retry="showDetailsErrorRetry"
    />
  </PageLayout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PageLayout from 'src/components/PageLayout';
import FeeAdjustmentDetailsDialog from 'src/components/FeeAdjustmentModule/FeeAdjustmentDetailsDialog';
import { URI } from 'src/config';
import FeeAdjustmentHistoryDownloadBtn from './HistoryDownloadBtn';

export default {
  name: 'FeeHistory',
  components: {
    PageLayout,
    FeeAdjustmentDetailsDialog,
    FeeAdjustmentHistoryDownloadBtn,
  },
  data() {
    return {
      loadingDataPromise: null,

      rawHistory: null,
      showDetailsDialog: false,
      shownDetails: null,
      showDetailsErrorRetry: null,
    };
  },
  computed: {
    ...mapState({
      brokers: state => state.business.brokers,
    }),
    /**
     * @typedef {Object} RawHistory
     * @property {Number} feeScheduleId
     * @property {Number} feeScheduleBrokerId
     * @property {String} status
     * @property {Number} version
     * @property {String} uploadDate
     * @property {String} actionDate
     * @property {String} originalDocLoc
     * @property {String} actionReason
     */
    history() {
      if (!this.rawHistory || !this.brokers) return;

      /**
       * @typedef HistoryItem
       * @property {number} version
       * @property {boolean} approved
       * @property {number} id
       * @property {string} reason
       */
      /**
       * @typedef History
       * @property {string} brokerName
       * @property {HistoryItem[]} items
       */
      /**
       * @typedef {Object.<string, History>} HistoryMap
       */
      /**
       * historyByBrokerId e.g.
       * {
       *  [brokerId: Number]: {
       *    brokerName: String,
       *    items: [{
       *      version: Number,
       *      approved: Boolean,
       *      id: Number
       *      reason: String
       *    }]
       *  }
       * }
       */
      /** @type {HistoryMap} */
      const historyByBrokerId = {};

      for (const item of this.rawHistory) {
        const brokerId = item.feeScheduleBrokerId;

        if (!historyByBrokerId[brokerId]) {
          historyByBrokerId[brokerId] = {
            brokerId,
            brokerCodePair: this.getBrokerCodePair(brokerId),
            items: [],
          };
        }

        const historyList = historyByBrokerId[brokerId].items;
        historyList.push({
          version: item.version,
          approved: item.status === 'APPROVED',
          id: item.feeScheduleId,
          reason: item.actionReason,
        });
      }

      // Sort by version in asc order. If version is the same, rejected should go first.
      for (const { items } of Object.values(historyByBrokerId)) {
        items.sort((item1, item2) => {
          const versionOrder = item1.version - item2.version;
          const item1Approval = item1.approved && 1 || 0;
          const item2Approval = item2.approved && 1 || 0;

          return versionOrder
            || (item1Approval - item2Approval);
        });
      }

      return Array.from(Object.values(historyByBrokerId));
    },
  },
  created() {
    this.boundFetchAll = () => {
      this.fetchAll();
    };

    this.fetchAll();
  },
  methods: {
    ...mapActions({
      fetchBrokers: 'business/fetchBrokers',
    }),
    /**
     * Fetches everything
     */
    fetchAll() {
      this.loadingDataPromise = Promise.all([
        this.fetchBrokers(),
        this.fetchHistory(),
      ]);
    },
    /**
     * Fetches details modal.
     */
    fetchHistory() {
      return this.$axios.get(URI.feeScheduleCompleted)
        .then(res => {
          this.rawHistory = res.data;
        })
    },
    /**
     * Gets a broker name (coy name + code) given a broker id
     * @param {Number} brokerId
     * @returns {String}
     */
    getBrokerCodePair(brokerId) {
      for (const { brokerMapId, exBrokerCode, cpBrokerCode } of this.brokers) {
        if (brokerId === brokerMapId) {
          return `${exBrokerCode} — ${cpBrokerCode}`;
        }
      }
    },
    /**
     * Triggers modal to show details.
     * @param {Number} brokerId
     */
    doShowDetails(brokerId) {
      const fetchLatestDetails = () => {
        this.showDetailsDialog = true;
        this.showDetailsErrorRetry = null;
        this.shownDetails = null;

        this.$axios.get(URI.feeScheduleLatest.replace('{brokerId}', brokerId))
          .then(({ data }) => {
            this.shownDetails = {
              data,
            };
          })
          .catch(() => {
            this.showDetailsErrorRetry = fetchLatestDetails
          });
      };

      fetchLatestDetails();
    },
    /**
     * Triggers dialog for showing approval status reason
     * @param {Boolean} approvalStatus
     * @param {String} reason
     */
    doShowReason(approvalStatus, reason) {
      const title = approvalStatus
        ? 'feeHistory.approvedReasonHeader'
        : 'feeHistory.rejectedReasonHeader'
      this.$q.dialog({
        title: this.$t(title),
        message: reason,
        focus: 'none',
      });
    },
    /**
     * Closes details modal.
     */
    doHideDetails() {
      this.showDetailsDialog = false;
    },
  },
}
</script>

<style lang="scss" module>
</style>
