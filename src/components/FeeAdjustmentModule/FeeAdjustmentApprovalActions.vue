<template>
  <div class="row">
    <q-input dense :label="$t('components.feeAdjustmentApprovalActions.reason')" class="q-mr-lg" :class="$style.reasonInput" outlined @input="onInput" v-model="inputValue" />
    <q-btn flat color="primary" :label="$t('components.feeAdjustmentApprovalActions.accept')" :class="$style.approvalBtn" class="q-mr-xs" @click="doSubmit(true)" />
    <q-btn flat color="negative" :label="$t('components.feeAdjustmentApprovalActions.deny')" :class="$style.approvalBtn" @click="doSubmit(false)" />
  </div>
</template>

<script>
export default {
  name: 'FeeAdjustmentApprovalActions',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    /**
     * Submission event handler.
     * Propagates a 'submit' event with custom payload.
     * 
     * @param {Boolean} isApproved - true for approved, false for denied
     */
    doSubmit(isApproved) {
      this.$emit('submit', {
        id: this.id,
        isApproved,
        reason: this.inputValue,
      });
    },
    /**
     * Reason input event handler; emits 'change' event.
     */
    onInput(event) {
      this.$emit('change', event)
    },
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