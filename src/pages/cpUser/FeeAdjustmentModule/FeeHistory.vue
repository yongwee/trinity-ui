<template>
  <PageLayout title="History">
      <q-table
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
              <div :class="props.row.approved ? 'text-positive' : 'text-negative'" class="text-weight-bold">
                {{ props.row.approved ? 'Approved' : 'Rejected' }}
              </div>
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
              unelevated
              color="primary"
              label="View Details"
              icon="mdi-eye-outline"
              class="q-mr-sm"
              dense
              @click="doShowDetails(props.row.data)"
            >
            </q-btn>
            <q-btn
              unelevated
              color="secondary"
              label="Download"
              dense
              icon="mdi-cloud-download-outline"
            />
            </q-td>
          </q-tr>
        </template>
      </q-table>

    <FeeAdjustmentDetailsDialog v-model="showDetailsDialog" :data="shownDetails" />
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
    FeeAdjustmentDetailsDialog,
  },
}
</script>

<style lang="scss" module>
</style>
