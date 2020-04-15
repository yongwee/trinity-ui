<template>
  <q-table
    flat
    hide-bottom
    :columns="columns"
    :data="data"
    :pagination.sync="pagination"
  />
</template>

<script>
export default {
  name: 'FeeAdjustmentTable',
  props: {
    data: {
      /**
       * Properties should match data:column fields
       */
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      columns: [
        {
          name: 'feeScheduleRowId',
          label: 'Fee Schedule Row Id',
          field: 'feeScheduleRowId',
          align: 'left',
          required: true,
        },
        // {
        //   name: 'feeScheduleId',
        //   label: 'Fee Schedule Id',
        //   field: 'feeScheduleId',
        //   align: 'left',
        //   required: true,
        // },
        {
          name: 'brokerId',
          label: 'Broker Id',
          field: 'feeScheduleBrokerId',
          align: 'left',
          required: true,
        },
        {
          name: 'csvRowId',
          label: 'Csv Row Id',
          field: 'csvRowId',
          align: 'left',
          required: true,
        },
        {
          name: 'inputDate',
          label: 'Input Date',
          field: 'inputDate',
          align: 'left',
          required: true,
        },
        {
          name: 'lastUpdatedDate',
          label: 'Last Updated Date',
          field: 'lastUpdatedDate',
          align: 'left',
        },
        {
          name: 'blockchainTxId',
          label: 'Blockchain Tx Id',
          field: 'blockchainTxId',
          align: 'left',
        },
        {
          name: 'blockchainHeight',
          label: 'Blockchain Height',
          field: 'blockchainHeight',
          align: 'left',
        },
        {
          name: 'directBill',
          label: 'Direct Bill',
          field: 'directBill',
          align: 'left',
        },
        {
          name: 'region',
          label: 'Region',
          field: 'region',
          align: 'left',
          required: true,
        },
        {
          name: 'exchange',
          label: 'Exchange',
          field: 'exchange',
          align: 'left',
          required: true,
        },
        {
          name: 'productGroupName',
          label: 'Product Group Name',
          field: 'productGroupName',
          align: 'left',
        },
        {
          name: 'productName',
          label: 'Product Name',
          field: 'productName',
          align: 'left',
          required: true,
        },
        {
          name: 'productType',
          label: 'Product Type',
          field: 'productType',
          align: 'left',
          required: true,
        },
        {
          name: 'currency',
          label: 'Currency',
          field: 'currency',
          align: 'left',
          required: true,
        },
        {
          name: 'tradeType',
          label: 'Trade Type',
          field: 'tradeType',
          align: 'left',
        },
        {
          name: 'spreadType',
          label: 'Spread Type',
          field: 'spreadType',
          align: 'left',
        },
        {
          name: 'rateType',
          label: 'Rate Type',
          field: 'rateType',
          align: 'left',
        },
        {
          name: 'execType',
          label: 'Exec Type',
          field: 'execType',
          align: 'left',
        },
        {
          name: 'defaultValue',
          label: 'Default Value',
          field: 'defaultValue',
          align: 'left',
          required: true,
        },
        {
          name: 'brokerageAmount',
          label: 'Brokerage Amount',
          field: 'brokerageAmount',
          align: 'left',
          required: true,
        },
        // {
        //   name: 'modification',
        //   label: 'Modification',
        //   field: 'modification',
        //   align: 'left',
        // },
      ],
      pagination: {rowsPerPage: 0},
    };
  }
}
</script>

<style lang="scss" module>
</style>