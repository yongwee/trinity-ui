<template>
  <q-page padding :class="$style.pageLayout" class="q-mx-auto">
    <div class="text-h4 q-mb-xl">
      <span>{{ title }}</span>
      <q-separator color="primary" />
    </div>
    <section>
      <template v-if="isLoading">
        <slot name="loading"></slot>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </section>
  </q-page>
</template>

<script>
export default {
  name: 'PageLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style lang="scss" module>
  .pageLayout {
    width: 940px;
  }
</style>
