<template>
  <div class="row">
    <q-input dense :label="$t('components.feeAdjustmentApprovalActions.reason')" class="q-mr-lg" :class="$style.reasonInput" outlined @input="onInput" v-model="inputValue" />
    <q-btn unelevated color="primary" :label="$t('components.feeAdjustmentApprovalActions.accept')" :class="$style.approvalBtn" class="q-mr-xs" @click="doSubmit(true)" />
    <q-btn unelevated color="negative" :label="$t('components.feeAdjustmentApprovalActions.deny')" :class="$style.approvalBtn" @click="doSubmit(false)" />
  </div>
</template>

<script>
export default {
  name: 'FeeAdjustmentApprovalActions',
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    doSubmit(value) {
      this.$emit('submit', { approve: value, reason: inputValue });
    },
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