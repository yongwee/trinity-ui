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
      :width="200"
      bordered
      content-class="bg-white"
      behavior="desktop"
    >
      <img
        :class="$style.logo"
        alt="Quasar logo"
        src="~assets/stacs_logo.png"
      >

      <q-separator />

      <q-list class="text-grey-9">
        <q-item
          :class="$style.drawerItem"
          v-for="link in navLinks"
          :key="link.title"
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';
import { role } from 'src/config';

export default {
  name: 'MainLayout',

  data () {
    return {
      linksByRole: {
        [role.counterParty]: [
          {
            title: 'Fee Adjustment',
            to: { name: 'feeSchedule/adjustment' }
          },
          {
            title: 'Approval List',
            to: { name: 'feeSchedule/approvallist' }
          },
          {
            title: 'History',
            to: { name: 'feeSchedule/history' }
          },
        ]
      },
    }
  },
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
      return this.linksByRole[this.userRole];
    }
  }
}
</script>

<style lang="scss" module>
.logo {
  display: block;
  width: 128px;
  margin: map-get($space-md, "y") auto ;
}

.drawerItem:focus, .drawerItem:hover {
  color: $primary;

  & > :global(.q-focus-helper) {
    opacity: 0 !important;
  }
}

.activeLink {
  font-weight: bold;
}
</style>