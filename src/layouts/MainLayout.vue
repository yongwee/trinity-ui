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
      bordered
      content-class="bg-white"
      behavior="desktop"
    >
      <q-toolbar-title>
          <img
            class="full-width q-pa-lg"
            alt="Quasar logo"
            src="~assets/stacs_logo.png"
          >
      </q-toolbar-title>
      <q-list>
        <q-item
          v-for="link in navLinks"
          :key="link.title"
          v-ripple
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
.activeLink {
  background-color: $blue-1;
}
</style>