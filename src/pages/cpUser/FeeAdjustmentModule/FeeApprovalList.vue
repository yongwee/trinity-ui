<template>
  <PageLayout title="Approval List">
    <q-card
      v-for="(approval, i) in approvalList"
      :key="i"
      flat
      bordered
      class="q-mb-sm"
    >
        <q-expansion-item
          :label="`${approval.uploader} has uploaded a new fee schedule`"
        >
          <FeeAdjustmentTable :data="approval.data" />
          <q-separator />
          <q-card-actions>
            <q-space />
            <q-input dense label="Reason" class="q-mr-lg" :class="$style.reasonInput" outlined />
            <q-btn unelevated color="primary" label="Accept" :class="$style.approvalBtn" @click="doApprove(approval.id)" />
            <q-btn unelevated color="negative" label="Deny" :class="$style.approvalBtn" @click="doDeny(approval.id)" />
          </q-card-actions>
        </q-expansion-item>
    </q-card>
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import FeeAdjustmentTable from 'src/components/FeeAdjustmentModule/FeeAdjustmentTable';

export default {
  name: 'FeeApprovalList',
  data() {
    return {
      approvalList: [],
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
      this.approvalList = [
        {
          uploader: 'JP Morgan',
          id: 1,
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
    doApprove(id) {
      console.log('approved ', id);
    },
    doDeny(id) {
      console.log('denied ', id);
    },
  },
  components: {
    PageLayout,
    FeeAdjustmentTable,
  },
}
</script>

<style lang="scss" module>
.reasonInput {
  width: 300px;
}

.approvalBtn {
  width: 80px;
}
</style>
