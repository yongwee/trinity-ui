<template>
  <q-table
    flat
    hide-bottom
    :columns="columns"
    :data="data"
    :pagination.sync="pagination"
  >
    <template v-slot:body="props">
      <q-tr
        :props="props"
        :class="{
          [$style.isModified]: getIsModified(props.row.feeScheduleId),
        }"
      >
        <template v-for="column in columns">
          <q-td
            v-if="column.showColumn !== false"
            :key="column.name"
            :props="props"
          >
            {{ column.format && column.format(props.row[column.field]) || props.row[column.field] }}
          </q-td>
        </template>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'FeeAdjustmentTable',
  props: {
    /**
     * Used for determining isModified
     */
    id: {
      type: Number,
      default: null,
    },
    data: {
      /**
       * Properties should match data:column fields
       */
      type: Array,
      required: true,
    },
    showModification: {
      type: Boolean,
      default: false,
    },
    /**
     * Forces all rows to show as modified rows
     */
    showAllRowsAsModified: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      pagination: {rowsPerPage: 0},
      rawColumns: [
        {
          name: 'directBill',
          label: this.$t('feeAdjustmentTable.directBillLabel'),
          field: 'directBill',
          align: 'left',
        },
        {
          name: 'region',
          label: this.$t('feeAdjustmentTable.regionLabel'),
          field: 'region',
          align: 'left',
          required: true,
        },
        {
          name: 'exchange',
          label: this.$t('feeAdjustmentTable.exchangeLabel'),
          field: 'exchange',
          align: 'left',
          required: true,
        },
        {
          name: 'productGroupName',
          label: this.$t('feeAdjustmentTable.productGroupNameLabel'),
          field: 'productGroupName',
          align: 'left',
        },
        {
          name: 'productName',
          label: this.$t('feeAdjustmentTable.productNameLabel'),
          field: 'productName',
          align: 'left',
          required: true,
        },
        {
          name: 'productType',
          label: this.$t('feeAdjustmentTable.productTypeLabel'),
          field: 'productType',
          align: 'left',
          required: true,
        },
        {
          name: 'currency',
          label: this.$t('feeAdjustmentTable.currencyLabel'),
          field: 'currency',
          align: 'left',
          required: true,
        },
        {
          name: 'tradeType',
          label: this.$t('feeAdjustmentTable.tradeTypeLabel'),
          field: 'tradeType',
          align: 'left',
        },
        {
          name: 'spreadType',
          label: this.$t('feeAdjustmentTable.spreadTypeLabel'),
          field: 'spreadType',
          align: 'left',
        },
        {
          name: 'rateType',
          label: this.$t('feeAdjustmentTable.rateTypeLabel'),
          field: 'rateType',
          align: 'left',
        },
        {
          name: 'execType',
          label: this.$t('feeAdjustmentTable.execTypeLabel'),
          field: 'execType',
          align: 'left',
        },
        {
          name: 'defaultValue',
          label: this.$t('feeAdjustmentTable.defaultValueLabel'),
          field: 'defaultValue',
          align: 'left',
          required: true,
        },
        {
          name: 'brokerageAmount',
          label: this.$t('feeAdjustmentTable.brokerageAmountLabel'),
          field: 'brokerageAmount',
          align: 'left',
          required: true,
        },
        {
          name: 'modification',
          label: this.$t('feeAdjustmentTable.modificationLabel'),
          field: 'feeScheduleId',
          align: 'left',
          format: val => {
            return this.getIsModified(val)
              ? this.$t('feeAdjustmentTable.modifiedYes')
              : this.$t('feeAdjustmentTable.modifiedNo');
          },
          showColumnToggle: 'showModification',
          required: true,
        },
        // {
        //   name: 'feeScheduleRowId',
        //   label: 'Fee Schedule Row Id',
        //   field: 'feeScheduleRowId',
        //   align: 'left',
        //   required: true,
        // },
        // {
        //   name: 'brokerId',
        //   label: 'Broker Id',
        //   field: 'feeScheduleBrokerId',
        //   align: 'left',
        //   required: true,
        // },
        // {
        //   name: 'csvRowId',
        //   label: 'Csv Row Id',
        //   field: 'csvRowId',
        //   align: 'left',
        //   required: true,
        // },
        // {
        //   name: 'inputDate',
        //   label: 'Input Date',
        //   field: 'inputDate',
        //   align: 'left',
        //   required: true,
        // },
        // {
        //   name: 'lastUpdatedDate',
        //   label: 'Last Updated Date',
        //   field: 'lastUpdatedDate',
        //   align: 'left',
        // },
        // {
        //   name: 'blockchainTxId',
        //   label: 'Blockchain Tx Id',
        //   field: 'blockchainTxId',
        //   align: 'left',
        // },
        // {
        //   name: 'blockchainHeight',
        //   label: 'Blockchain Height',
        //   field: 'blockchainHeight',
        //   align: 'left',
        // },
        // {
        //   name: 'modification',
        //   label: 'Modification',
        //   field: 'modification',
        //   align: 'left',
        // },
      ],
    };
  },
  computed: {
    columns() {
      return this.rawColumns.filter(col => {
        return this[col.showColumnToggle] !== false;
      });
    },
  },
  methods: {
    getIsModified(feeScheduleId) {
      return this.showAllRowsAsModified
        || (
          this.id !== null
          && this.id !== feeScheduleId
        );
    },
  },
}
</script>

<style lang="scss" module>
.isModified {
  color: $orange-8;
}
</style>