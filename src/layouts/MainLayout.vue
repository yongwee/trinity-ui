<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        /> -->
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
        alt="Quasar logo"
        src="~assets/stacs_logo.png"
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
              {{ link.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <template v-else>
        <q-skeleton v-for="i in 3" type="rect" :key="i" class="q-ma-lg" />
      </template>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
import { role, routeAccess } from 'src/config';

export default {
  name: 'MainLayout',
  computed: {
    ...mapState({
      userRole: state => state.user.role,
    }),
    /**
     * Returns navigation links based on role
     *
     * @returns {Object[]} - links
     */
    navLinks() {
      return routeAccess[this.userRole].map(route => {
        return {
          title: route.title,
          to: { name: route.name },
        };
      });
    }
  }
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

.activeLink {
  background-color: $blue-1;
  font-weight: bold;
}
</style>