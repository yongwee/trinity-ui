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
        <FeeAdjustmentTable v-if="details" :data="details.data" />
      </q-scroll-area>

      <q-card-actions>
        <slot name="actions" :id="details && details.id || ''" />
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
    /**
     * details props.
     * @property {String} id
     * @property {Object} data 
     */
    details: {
      type: Object,
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