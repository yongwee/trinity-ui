<template>
  <q-table
    :columns="columns"
    :data="data"
    :filter="searchValue"
    flat
    bordered
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
        v-if="selectOptions && selectOptions.length"
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

    <template
      v-if="!!$scopedSlots.body"
      v-slot:body="props"
    >
      <slot
        name="body"
        v-bind="props"
      />
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      default: undefined,
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
