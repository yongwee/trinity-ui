<template>
  <q-dialog
    key="baseCashTransferToken"
    :value="value"
    @input="$emit('input')"
    @hide="onHide"
  >
    <q-card :class="$style.dialogBody">
      <q-card-section class="row justify-between items-start">
        <SectionHeader :header="$t('baseCashToken.transferTokenHeader')" />
        <q-btn
          v-close-popup
          round
          flat
          dense
          icon="close"
        />
      </q-card-section>

      <q-form
        @submit="submit"
        @change="onFormChange"
      >
        <q-card-section class="row q-gutter-sm q-py-none">
          <q-input
            v-model="amount"
            :label="$t('baseCashToken.transferTokenAmount')"
            type="number"
            class="col-11"
            outlined
            :rules="[val => !!val || 'Please provide an amount']"
          />
          <q-select
            v-model="investorAccount"
            :label="$t('baseCashToken.transferTokenInvestorAccount')"
            class="col-11"
            outlined
            :options="investorAccountOptions"
            :rules="[val => !!val || 'Please select an investor account']"
            @input="onFormChange"
          />
        </q-card-section>

        <q-card-actions class="row justify-end">
          <q-btn
            type="submit"
            color="primary"
            flat
            :label="$t('baseCashToken.transferTokenTransfer')"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import SectionHeader from 'src/components/form/SectionHeader';

export default {
  name: 'BaseCashTokenTransferTokenDialog',
  components: {
    SectionHeader,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      investorAccountOptions: ['Test investor'],

      amount: null,
      investorAccount: null,
    };
  },
  methods: {
    /**
     * Handles form's change event. Propagates a 'change' event.
     */
    onFormChange() {
      this.$emit('change');
    },
    /**
     * Handles submission event. Propagates a 'submit' event with payload.
     */
    submit() {
      // TODO: fill in payload params properly
      this.$emit('submit', {
        amount: this.amount,
        investorAccount: this.investorAccount,
      });
    },
    /**
     * Handles form reset event. Resets form elements.
     */
    reset() {
      this.amount = null;
      this.investorAccount = null;
    },
    /**
     * Handles actions to perform on dialog hide event.
     */
    onHide() {
      this.reset();
    },
  },
}
</script>

<style lang="scss" module>
.dialogBody {
  min-width: 400px;
}
</style>