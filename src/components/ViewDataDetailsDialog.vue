<template>
  <q-dialog
    :value="value"
    @input="$emit('input')"
  >
    <q-card
      :class="{
        [$style.dialogContainer]: true,
        [$style.loadingOrError]: isLoading || hasError,
      }"
    >
      <GenericLoadingScreen
        v-if="isLoading"
        centered
      />
      <GenericErrorScreen
        v-else-if="hasError"
        centered
        @retry="errorRetry"
      />

      <template v-else-if="data">
        <q-card-section class="row items-center">
          <span
            v-if="!!header"
            class="text-h6 q-mr-md"
          >{{ header }}</span>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>

        <q-list
          class="q-dialog__message"
          :class="$style.bodyContainer"
        >
          <q-item
            v-for="row in rows"
            :key="row.field"
          >
            <q-item-section
              side
              :class="$style.dialogLabel"
            >
              {{ row.label }}
            </q-item-section>
            <q-item-section>{{ data[row.field] }}</q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-card>
  </q-dialog>
</template>

<script>
import LoadingAndErrorStateMixin from 'src/mixins/LoadingAndErrorStateMixin';
import GenericLoadingScreen from 'src/components/GenericLoadingScreen';
import GenericErrorScreen from 'src/components/GenericErrorScreen';

export default {
  name: 'ViewDataDetailsDialog',
  components: {
    GenericLoadingScreen,
    GenericErrorScreen,
  },
  mixins: [LoadingAndErrorStateMixin],
  props: {
    header: {
      type: String,
      default: null,
    },
    value: {
      type: Boolean,
      default: null,
    },
    /**
     * Row definition.
     * e.g.
     * [ // 'field' should match keys in token data
     *  {
     *    label: 'Token Name',
     *    field: 'tokenName',
     *  },
     *  {
     *    label: 'Description',
     *    field: 'description',
     *  },
     *
     * token data e.g.
     * { tokenName: 'USDA', description: 'some description' }
     */
    rows: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    errorRetry: {
      type: Function,
      default: null,
    },
  },
}
</script>

<style lang="scss" module>
.dialogContainer {
  min-width: 350px;
}

.dialogLabel {
  width: 120px;
}

.loadingOrError {
  height: 250px;
  width: 350px;
}

.bodyContainer {
  word-break: break-word;
}
</style>
