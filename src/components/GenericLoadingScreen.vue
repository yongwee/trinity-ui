<template>
  <div
    :class="{
      [$style.container]: !centered,
      'full-width': centered,
      'full-height': centered,
    }"
    class="column flex-center"
  >
    <q-spinner
      size="xl"
      color="primary"
    />
  </div>
</template>

<script>
export default {
  name: 'GenericLoadingScreen',
  props: {
    centered: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" module>
.container {
  padding-top: 25vh;
}
</style>
