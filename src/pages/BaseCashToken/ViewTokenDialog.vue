<template>
  <ViewDataDetailsDialog
    :value="isOpen"
    :data="data"
    :rows="rows"
    :loading-data-promise="loadingDataPromise"
    :error-retry="boundFetchData"
    :header="$t('baseCashToken.viewTokenHeader', { tokenName: value })"
    @input="onInput"
  />
</template>

<script>
import ViewDataDetailsDialog from 'src/components/ViewDataDetailsDialog';
import FormatCurrencyMixin from 'src/mixins/FormatCurrencyMixin';
import { URI } from 'src/config';

/**
 * This dialog will open the moment value is populated with a token code
 * Will also close automatically when value is cleared (usually propagated by this dialog thru input event).
 */
export default {
  name: 'BaseCashTokenViewTokenDialog',
  components: {
    ViewDataDetailsDialog,
  },
  mixins: [FormatCurrencyMixin],
  props: {
    value: { // Token Code
      type: String,
      default: null,
    }
  },
  data() {
    return {
      rows: [ // Field should match keys in token data
        {
          label: 'Token Code',
          field: 'tokenCode',
        },
        {
          label: 'Issuer Address',
          field: 'issuerAddress',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'TX ID',
          field: 'txId',
        },
        {
          label: 'Token Type',
          field: 'tokenType',
        },
        {
          label: 'Amount',
          field: 'amount',
        },
        {
          label: 'Currency Code',
          field: 'currencyCode',
        },
      ],
      data: {},

      loadingDataPromise: null,
    }
  },
  computed: {
    isOpen() {
      return !!this.value;
    },
  },
  watch: {
    value() {
      this.value && this.fetchData();
    }
  },
  created() {
    this.boundFetchData = () => {
      this.fetchData();
    };
  },
  methods: {
    /**
     * Input change handler.
     * Sets value (token code) to empty string if val is falsey.
     * @param {Boolean} val
     */
    onInput(val) {
      !val && this.$emit('input', '');
    },
    fetchData() {
      // Please ensure that 'rows' in ViewTokenDialog corroborates with fetched data's shape
      // (viewTokenRows.field must match data keys)

      // this.loadingDataPromise = this.$axios(URI.baseCashTokenByTokenCode.replace('{tokenCode}', this.value));
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: {
        "tokenCode" : this.value,
        "amount" : 1.0800828190461012,
        "issuerAddress" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
        "description" : "this represents fiat currency for accumulators only",
        "txId" : "300e5f3e8c3d2a8ff063a70df3d58b2573c03842d2ac259368e54b3014b19540",
        "underlying" : "USD",
        "tokenType" : "BaseCash",
        "creationDate" : "2020-03-20T23:12:14Z",
        "currencyCode" : "840"
      }});
      // --- END BLOCK ---

      this.loadingDataPromise
        .then(({ data }) => {
          this.data = {
            ...data,
            amount: this.formatCurrency(
              this.$i18n.locale,
              data.underlying,
              data.amount
            ),
          };
        });
    }
  }
}
</script>

<style lang="scss" module>
</style>
