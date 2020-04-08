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
  computed: {
    ...mapState({
      userRole: state => state.user.role,
    }),
  },
  watch: {
    userRole:{
      immediate: true,
      handler(role) {
        // TODO: properly redirect user to their role's respective homepage
        const routeAccessMap = routeAccess[role];
        const defaultRoute = routeAccessMap && routeAccessMap[0];

        if (defaultRoute) {
          this.$router.replace({ name: defaultRoute.name });
        } else {
          this.$q.notify({
            message: 'Unable to find a default route for this user',
            color: 'negative',
            position: 'top',
          })
        }
      }
    },
  },
  components: {
    PageLayout,
  },
}
</script>
