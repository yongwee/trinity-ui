<template>
  <q-table
    :columns="columns"
    :data="value"
    :filter="searchValue"
    flat
    v-bind="$attrs"
  >
    <template v-slot:top>
      <q-input
        dense
        debounce="300"
        outlined
        :value="searchValue"
        clearable
        :placeholder="searchLabel"
        :class="$style.searchInput"
        @input="val => $emit('update:searchValue', val)"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-space />

      <q-select
        v-if="showSelect && selectOptions && selectOptions.length"
        dense
        outlined
        clearable
        :value="selectValue"
        :options="selectOptions"
        :label="selectLabel"
        :class="$style.selectInput"
        @input="val => $emit('update:selectValue', val)"
      />
    </template>

    <!-- body slot -->
    <template
      v-if="!!$scopedSlots.body"
      v-slot:body="props"
    >
      <slot
        name="body"
        v-bind="props"
      />
    </template>

    <!-- body cell slots -->
    <template
      v-for="bodyCellSlot in bodyCellSlots"
      v-slot:[bodyCellSlot]="props"
    >
      <slot
        :name="bodyCellSlot"
        v-bind="props"
      />
    </template>

    <!-- no data slot -->
    <template
      v-if="hasNoDataSlot || inLoadingState || inErrorState"
      v-slot:no-data="props"
    >
      <GenericLoadingScreen
        v-if="inLoadingState"
        :centered="true"
      />
      <GenericErrorScreen
        v-else-if="inErrorState"
        :centered="true"
        @retry="errorRetry"
      />
      <slot
        v-else
        name="no-data"
        v-bind="props"
      />
    </template>
  </q-table>
</template>

<script>
import LoadingAndErrorStateMixin from 'src/mixins/LoadingAndErrorStateMixin';
import GenericLoadingScreen from 'src/components/GenericLoadingScreen';
import GenericErrorScreen from 'src/components/GenericErrorScreen';

export default {
  name: 'DataTable',
  components: {
    GenericLoadingScreen,
    GenericErrorScreen
  },
  mixins: [LoadingAndErrorStateMixin],
  props: {
    columns: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
    },

    errorRetry: {
      type: Function,
      default: null,
    },

    searchLabel: {
      type: String,
      default() {
        return this.$t('components.dataTable.searchLabel');
      },
    },
    selectLabel: {
      type: String,
      default() {
        return this.$t('components.dataTable.selectLabel');
      },
    },

    searchValue: {
      type: String,
      default: undefined,
    },
    selectValue: {
      type: String,
      default: undefined,
    },
    selectOptions: {
      type: Array,
      default: undefined,
    },
    // This prop is here temporarily to hide the select filter as they are currently unused
    showSelect: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * Generates a list of passthrough body-cell-[slotname] slots
     */
    bodyCellSlots() {
      const prefix = 'body-cell-';
      const bodyCellSlots = [];

      for (const { name } of this.columns) {
        const slotName = prefix + name;
        if (!!this.$scopedSlots[slotName]) {
          bodyCellSlots.push(slotName);
        }
      }

      return bodyCellSlots;
    },
    hasNoDataSlot() {
      return !!this.$scopedSlots['no-data'];
    },
    /**
     * Property determining that table is not populated with data
     */
    noData() {
      return !this.value || !this.value.length;
    },
    inLoadingState() {
      return this.isLoading && this.noData;
    },
    inErrorState() {
      return this.hasError && this.noData;
    },
  },
  watch: {
    loadingDataPromise: {
      handler() {
        if (!this.loadingDataPromise) return;

        this.loadingDataPromise
          .catch(() => {
            this.$emit('input', []);
          });
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" module>
.searchInput {
  width: 50%;
}

.selectInput {
  width: 40%;
}
</style>
