<template>
  <PageLayout :title="$t('fxTokenOpenPosition.title')">
    <router-view />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';

export default {
  name: 'FXTokenOpenPositionLayout',
  components: {
    PageLayout,
  }
}
</script>