<template>
  <q-dialog
    :value="value"
    full-width
    full-height
    @input="onInput"
  >
    <q-card
      :class="$style.dialogCard"
      class="column"
    >
      <q-card-section class="row justify-end">
        <q-btn
          dense
          round
          unelevated
          icon="close"
          @click="doHideDetails"
        />
      </q-card-section>

      <FeeAdjustmentTable
        v-if="details"
        :id="details.id"
        v-bind="$attrs"
        class="q-mb-md"
        :class="$style.dialogBody"
        :data="details.data"
        :show-all-rows-as-modified="details.showAllRowsAsModified"
      />
      <GenericErrorScreen
        v-else-if="!!errorRetry"
        :class="$style.dialogBody"
        centered
        @retry="errorRetry"
      />
      <GenericLoadingScreen
        v-else
        :class="$style.dialogBody"
        centered
      />

      <q-card-actions>
        <slot
          :id="details && details.id"
          name="actions"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import FeeAdjustmentTable from './FeeAdjustmentTable';
import GenericErrorScreen from 'src/components/GenericErrorScreen';
import GenericLoadingScreen from 'src/components/GenericLoadingScreen';

export default {
  name: 'FeeAdjustmentDetailsDialog',
  components: {
    FeeAdjustmentTable,
    GenericErrorScreen,
    GenericLoadingScreen,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    /**
     * details props.
     * @property {string} id
     * @property {boolean} forceShowModified
     * @property {Object} data 
     */
    details: {
      type: Object,
      default: null,
    },
    errorRetry: {
      type: Function,
      default: function() {},
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
}
</script>

<style lang="scss" module>
.dialogCard {
  height: 100vh;
}

.dialogBody {
  position: relative;
  flex-grow: 1;
  overflow: auto;
  width: 100%;
  flex-basis: 0;

  thead tr:first-child th {
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 1;
  }
}
</style>