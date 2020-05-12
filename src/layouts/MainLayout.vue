<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
    >
      <q-toolbar class="justify-end">
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        /> -->
        <UserProfileBtn />
      </q-toolbar>
    </q-header>

    <q-drawer
      :value="true"
      :width="220"
      bordered
      content-class="bg-white"
      behavior="desktop"
    >
      <img
        :class="$style.logo"
        alt="Mercury logo"
        src="~assets/mercury_logo.png"
      >

      <q-list v-if="navLinks && navLinks.length">
        <q-item
          v-for="link in navLinks"
          :key="link.title"
          v-ripple
          :class="$style.drawerItem"
          :exact-active-class="$style.activeLink"
          :to="link.to"
        >
          <q-item-section>
            <q-item-label>
              {{ $t(link.titleKey) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <template v-else>
        <q-skeleton
          v-for="i in 3"
          :key="i"
          type="rect"
          class="q-ma-lg"
        />
      </template>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <SessionExpirationHelper />
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
import UserProfileBtn from 'src/components/UserProfileBtn';
import SessionExpirationHelper from 'src/pages/SessionExpirationHelper';

export default {
  name: 'MainLayout',
  components: {
    UserProfileBtn,
    SessionExpirationHelper,
  },
  computed: {
    ...mapState({
      userRoutes: state => state.user.accessibleRoutes,
    }),
    /**
     * Returns navigation links based on role
     *
     * @returns {Object[]} - links
     */
    navLinks() {
      return this.userRoutes
        .filter(route => {
          return !route.noNavDrawer;
        })
        .map(route => {
          return {
            titleKey: route.navBarTitleKey,
            to: { name: route.name },
          };
        });
    },
  },
}
</script>

<style lang="scss" module>
.logo {
  display: block;
  width: 128px;
  margin: map-get($space-md, "y") auto;
  margin-bottom: map-get($space-lg, "y");
}

// .drawerItem:focus, .drawerItem:hover {
//   color: $primary;

//   & > :global(.q-focus-helper) {
//     opacity: 0 !important;
//   }
// }

:global(.q-router-link--active) {
  background-color: $blue-1;
  font-weight: bold;
}
</style>