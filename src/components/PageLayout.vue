<template>
  <q-page
    padding
    :class="$style.pageLayout"
    class="q-mx-auto"
  >
    <div class="q-mb-xl">
      <q-breadcrumbs
        v-if="breadcrumbs"
        class="q-mb-md"
      >
        <template v-slot:separator>
          <q-icon
            size="1.2em"
            name="chevron_right"
          />
        </template>
        <q-breadcrumbs-el
          v-for="{ labelKey, name } in breadcrumbs"
          :key="labelKey"
          :label="$t(labelKey)"
          :to="{ name }"
        />
        <!-- current page breadcrumb el -->
        <q-breadcrumbs-el
          key="here"
          :label="currentPageTitle"
          :to="{ name: $route.name }"
        />
      </q-breadcrumbs>

      <span class="text-h4 text-weight-light row items-center">
        <q-btn
          v-if="breadcrumbs"
          dense
          flat
          round
          icon="mdi-arrow-left"
          class="q-mr-sm"
          @click="goBack"
        />
        <slot name="title">{{ title || currentPageTitle }}</slot>
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
import LoadingAndErrorStateMixin from 'src/mixins/LoadingAndErrorStateMixin';
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
  mixins: [LoadingAndErrorStateMixin],
  props: {
    title: {
      type: String,
      default: undefined,
    },
    titleFormatConfig: { // for formatting i18n strings, see: https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting
      type: Object,
      default: null,
    },
    retry: {
      type: Function,
      default: function() {},
    }
  },
  computed: {
    currentPageTitle() {
      return this.$t(this.titleKey, this.titleFormatConfig);
    },
    titleKey() {
      return this.$route.meta.titleKey;
    },
    breadcrumbs() {
      return this.$route.meta.breadcrumbs;
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
}
</script>

<style lang="scss" module>
  .pageLayout {
    width: 940px;
  }
</style>
