<template>
  <PageLayout title="History">
    <q-list separator bordered>
      <q-item v-for="item in history" :key="item.uploader">
        <q-item-section class="col-8">{{ item.uploader }}</q-item-section>
        <q-item-section>
          <span>{{ item.status }}</span>
        </q-item-section>
        <q-item-section avatar :class="$style.actions">
          <q-btn
            round
            unelevated
            color="primary"
            icon="mdi-eye-outline"
            class="q-mr-sm"
            @click="doShowDetails(item.data)"
          >
            <q-tooltip>View Details</q-tooltip>
          </q-btn>
          <q-btn round unelevated color="secondary" icon="mdi-cloud-download-outline">
            <q-tooltip>Download</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog
      v-model="showDetailsDialog"
      seamless
      position="bottom"
      full-width
    >
      <q-card :class="$style.dialogCard">
        <q-card-section class="row justify-end">
          <q-btn round unelevated icon="close" @click="doHideDetails" />
        </q-card-section>
        <q-card-section>
          <FeeAdjustmentTable v-if="shownDetails" :data="shownDetails" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import FeeAdjustmentTable from 'src/components/FeeAdjustmentModule/FeeAdjustmentTable';

export default {
  name: 'FeeHistory',
  data() {
    return {
      history: [],
      showDetailsDialog: false,
      shownDetails: null,
    };
  },
  created() {
    this.fetchHistory();
  },
  methods: {
    fetchHistory() {
      // TODO: proper fetching
      this.history = [
        {
          uploader: 'JP Morgan',
          status: 'Approved',
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
          status: 'Rejected',
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
     * Triggers modal to show details
     * 
     * @param {Object} data - data portion of history
     */
    doShowDetails(data) {
      this.showDetailsDialog = true;
      this.shownDetails = data;
    },
    /**
     * Closes details modal
     */
    doHideDetails() {
      this.showDetailsDialog = false;
    },
  },
  components: {
    PageLayout,
    FeeAdjustmentTable,
  },
}
</script>

<style lang="scss" module>
.actions {
  flex-direction: row !important;
}

.dialogCard {
  height: 100vh;

}
</style>
