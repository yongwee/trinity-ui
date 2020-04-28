<template>
  <ViewDataDetailsDialog
    :value="isOpen"
    :data="data"
    :rows="rows"
    :loading-data-promise="loadingDataPromise"
    :error-retry="boundFetchData"
    :header="$t('spToken.viewTokenHeader', { tokenName: value })"
    @input="onInput"
  />
</template>

<script>
import ViewDataDetailsDialog from 'src/components/ViewDataDetailsDialog';
import { URI } from 'src/config';

/**
 * This dialog will open the moment value is populated with a token code
 * Will also close automatically when value is cleared (usually propagated by this dialog thru input event).
 */
export default {
  name: 'SPTokenViewTokenDialog',
  components: {
    ViewDataDetailsDialog,
  },
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
          label: 'Token Name',
          field: 'tokenName',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Investor',
          field: 'investor',
        },
        {
          label: 'Amount',
          field: 'amount',
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

      // this.loadingDataPromise = this.$axios(URI.spTokenByTokenCode.replace('{tokenCode}', this.value));
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: {
          tokenCode: this.value,
          tokenName: 'Token ' + this.value,
          description: 'Token ' + this.value + ' description',
          investor: 'Investor name here',
          amount: 'amount here'
        },
      });
      // --- END BLOCK ---

      this.loadingDataPromise
        .then(({ data }) => {
          this.data = data;
        });
    }
  }
}
</script>

<style lang="scss" module>
.dialogContainer {
  min-width: 350px;
}

.dialogLabel {
  width: 120px;
}
</style>
