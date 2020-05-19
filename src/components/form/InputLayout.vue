<template>
  <div
    class="row q-gutter-sm"
    :class="$style.layout"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormInputLayout',
}
</script>

<style lang="scss" module>
.layout :global(.break) {
  width: 100%;
  margin: 0;
}
</style>