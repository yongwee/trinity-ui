<template>
  <div class="row">
    <q-input
      v-model="inputValue"
      dense
      :label="$t('components.feeAdjustmentApprovalActions.reason')"
      class="q-mr-lg"
      :class="$style.reasonInput"
      outlined
      @input="onInput"
    />
    <q-btn
      flat
      color="negative"
      :label="$t('components.feeAdjustmentApprovalActions.reject')"
      :class="$style.approvalBtn"
      @click="doSubmit(false)"
    />
    <q-btn
      flat
      color="primary"
      :label="$t('components.feeAdjustmentApprovalActions.accept')"
      :class="$style.approvalBtn"
      class="q-mr-xs"
      @click="doSubmit(true)"
    />
  </div>
</template>

<script>
export default {
  name: 'FeeAdjustmentApprovalActions',
  props: {
    id: {
      type: Number,
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
     * @param {Boolean} isApproved - true for approved, false for rejected
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
  width: 50vw;
}

.approvalBtn {
  width: 80px;
}
</style>