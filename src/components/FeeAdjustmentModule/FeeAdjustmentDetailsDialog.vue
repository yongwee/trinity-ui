<template>
  <q-dialog
      :value="value"
      @input="onInput"
      position="bottom"
      full-width
      persistent
    >
    <q-card :class="$style.dialogCard" class="column">
      <q-card-section class="row justify-end">
        <q-btn round unelevated icon="close" @click="doHideDetails" />
      </q-card-section>
      <q-scroll-area class="col-grow q-mb-md">
        <FeeAdjustmentTable v-if="data" :data="data" />
      </q-scroll-area>

      <q-card-actions>
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import FeeAdjustmentTable from './FeeAdjustmentTable';

export default {
  name: 'FeeAdjustmentDetailsDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array, // Array of objects
      default: null,
    },
  },
  methods: {
    /**
     * Hides dialog
     */
    doHideDetails() {
      this.$emit('input', false);
    },
    /**
     * Propagates value change
     * 
     * @param {boolean} val
     */
    onInput(val) {
      this.$emit('input', val);
    },
  },
  components: {
    FeeAdjustmentTable,
  },
}
</script>

<style lang="scss" module>
.dialogCard {
  height: 100vh;
}
</style>