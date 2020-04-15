<template>
  <q-page
    padding
    :class="$style.pageLayout"
    class="q-mx-auto"
  >
    <div class="text-h4 text-weight-light q-mb-xl">
      <span>
        <slot name="title">{{ title || $t(titleKey) }}</slot>
      </span>
      <q-separator color="primary" />
    </div>
    <section class="relative-position">
      <template v-if="isLoading">
        <!-- @slot Slot for inserting loading state body -->
        <slot name="loading">
          <GenericLoadingScreen />
        </slot>
      </template>
      <template v-else>
        <!-- @slot Slot for inserting regular body content -->
        <slot />
        <GenericErrorScreen
          v-if="hasError"
          @retry="retry"
        />
      </template>
    </section>
  </q-page>
</template>

<script>
import GenericLoadingScreen from 'src/components/GenericLoadingScreen'
import GenericErrorScreen from 'src/components/GenericErrorScreen'

/**
 * PageLayout provides common elements of a page and their arrangement.
 */
export default {
  name: 'PageLayout',
  components: {
    GenericLoadingScreen,
    GenericErrorScreen,
  },
  props: {
    title: {
      type: String,
      default: undefined,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    retry: {
      type: Function,
      default: function() {},
    }
  },
  computed: {
    titleKey() {
      return this.$route.meta.titleKey;
    }
  }
}
</script>

<style lang="scss" module>
  .pageLayout {
    width: 940px;
  }
</style>
