<template>
  <PageLayout title="History">
      <q-table
        v-if="history && history.length"
        hide-header
        hide-bottom
        flat
        bordered
        :columns="columns"
        :data="history"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="uploader" :props="props">
              {{ props.row.uploader }}
            </q-td>
            <q-td key="approved" :props="props">
              <q-badge :color="props.row.approved ? 'positive' : 'negative'" class="text-weight-bold q-pa-xs">
                {{props.row.approved
                    ? $t('feeHistory.approved')
                    : $t('feeHistory.rejected')
                }}
              </q-badge>
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
                flat
                color="secondary"
                class="q-mr-sm"
                :label="$t('feeHistory.download')"
              />
              <q-btn
                flat
                color="primary"
                :label="$t('feeHistory.viewDetails')"
                @click="doShowDetails(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <div class="row flex-center" v-else>
        <span>{{ $t('feeHistory.emptyHistoryMessage') }}</span>
      </div>

    <FeeAdjustmentDetailsDialog v-model="showDetailsDialog" :details="shownDetails" />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import FeeAdjustmentDetailsDialog from 'src/components/FeeAdjustmentModule/FeeAdjustmentDetailsDialog';

export default {
  name: 'FeeHistory',
  data() {
    return {
      columns:[
        {
          name: 'uploader',
          field: 'uploader',
          require: true,
          align: 'left',
          style: 'width: 50%;',
        },
        {
          name: 'approved',
          field: 'approved',
          require: true,
          align: 'left',
        },
        {
          name: 'actions',
          field: 'actions',
          align: 'right',
        },
      ],
      history: [],
      showDetailsDialog: false,
      shownDetails: null,
    };
  },
  created() {
    this.fetchHistory();
  },
  methods: {
    /**
     * Fetches details modal.
     */
    fetchHistory() {
      // TODO: proper fetching
      this.history = [
        {
          uploader: 'JP Morgan',
          approved: true,
          data: [
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
          ]
        },
        {
          uploader: 'Citigroup',
          approved: false,
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
      ];
    },
    /**
     * Triggers modal to show details.
     * 
     * @param {Object} details
     * @param {String} details.uploader
     * @param {String} details.id
     * @param {Object[]} details.data
     */
    doShowDetails(details) {
      this.showDetailsDialog = true;
      this.shownDetails = details;
    },
    /**
     * Closes details modal.
     */
    doHideDetails() {
      this.showDetailsDialog = false;
    },
  },
  components: {
    PageLayout,
    FeeAdjustmentDetailsDialog,
  },
}
</script>

<style lang="scss" module>
</style>
