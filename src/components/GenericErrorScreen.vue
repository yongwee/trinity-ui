<template>
  <div
    class="absolute-top full-width full-height column items-center"
    :class="{
      [$style.container]: true,
      [$style.centered]: !centered,
      'flex-center': centered,
    }"
  >
    <q-icon
      name="mdi-alert"
      color="negative"
      size="xl"
      class="q-mb-sm"
    />
    <div class="q-mb-md">
      {{ $t('components.genericErrorScreen.message') }}
    </div>
    <q-btn
      flat
      color="primary"
      :label="$t('components.genericErrorScreen.retry')"
      @click="$emit('retry')"
    />
  </div>
</template>

<script>
export default {
  name: 'GenericErrorScreen',
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
  margin-bottom: -4px;
  background-color: rgba(255, 255, 255, 0.88);
}

.centered {
  min-height: 70vh;
  padding-top: 20vh;
}
</style>
