<template>
  <q-table
    flat
    hide-bottom
    :columns="columns"
    :data="data"
  />
</template>

<script>
export default {
  name: 'FeeAdjustmentTable',
  data() {
    return {
      columns: [
        {
          name: 'region',
          label: 'Region',
          field: 'region',
          align: 'left',
          required: true,
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
          name: 'brokerageAmount',
          label: 'Brokerage Amount',
          field: 'brokerageAmount',
          align: 'left',
          required: true,
        },
        {
          name: 'modification',
          label: 'Modification',
          field: 'modification',
          align: 'left',
        },
      ],
    };
  },
  props: {
    data: {
      /**
       * @typedef Data
       * @property {string} region
       * @property {string} productName
       * @property {string} productType
       * @property {string} currency
       * @property {string} brokerageAmount
       * @property {string} modification
       */
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="scss" module>
</style>