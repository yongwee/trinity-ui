<template>
  <PageLayout :title="$t('spToken.title')">
    <router-view />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';

export default {
  name: 'SPTokenLayout',
  components: {
    PageLayout,
  }
}
</script>
