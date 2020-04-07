<template>
  <div class="q-mb-sm">
    <div class="text-h6">
      {{ header }}
    </div>
    <div
      v-if="caption"
      class="text-caption text-grey-9"
    >
      {{ caption }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSectionHeader',
  props: {
    header: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" module>
</style>