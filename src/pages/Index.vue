<template>
  <PageLayout>
    <template v-slot:title>
      <q-skeleton
        type="rect"
        width="30%"
        class="q-mb-sm"
      />
    </template>

    <q-skeleton
      type="text"
      width="40%"
    />
    <q-skeleton
      type="text"
      width="60%"
    />
    <q-skeleton
      type="text"
      width="20%"
    />
  </PageLayout>
</template>

<script>
import { mapState } from 'vuex';
import PageLayout from 'src/components/PageLayout';
import { routeAccess } from 'src/config';

export default {
  name: 'PageIndex',
  components: {
    PageLayout,
  },
}
</script>
