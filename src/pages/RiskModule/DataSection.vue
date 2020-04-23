<template>
  <q-card-section class="column justify-between items-center">
    <div class="text-grey-8 q-mb-md">
      {{ header }}
    </div>
    <div class="text-h6">
      {{ label }}
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: 'RiskModuleDataSection',
  props: {
    header: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  },
}
</script>

<style lang="scss" module>
</style>