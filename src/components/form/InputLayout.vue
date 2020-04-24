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
.layout :global(br) {
  width: 100%;
  content: '';
  margin: 0;
}
</style>