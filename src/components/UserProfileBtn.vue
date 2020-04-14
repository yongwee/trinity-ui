<template>
  <div>
    <span class="text-weight-bold q-mr-md">Welcome, {{ userRole }}</span>
    <q-btn
      round
      icon="mdi-account"
      color="white"
      text-color="primary"
      dense
      unelevated
    >
      <q-menu
        transition-show="jump-down"
        transition-hide="jump-up"
        fit
      >
        <div class="q-ma-md column flex-center">
          <q-icon
            name="mdi-account"
            size="xl"
            color="grey-8"
          />
          <div>{{ userRole }}</div>
        </div>

        <q-separator />

        <q-list style="min-width: 200px">
          <q-item-label header>
            Select new role
          </q-item-label>
          <q-item
            v-for="(item, i) in items"
            :key="i"
            v-close-popup
            clickable
            @click="changeRole(item)"
          >
            {{ item }}
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { role } from 'src/config';
import { mapState } from 'vuex';

export default {
  name: 'UserProfileBtn',
  data() {
    return {
      items: Array.from(Object.values(role)),
    };
  },
  computed: {
    ...mapState({
      userRole: state => { return state.user.role; },
    }),
  },
  methods: {
    changeRole(newRole) {
      this.$store.commit('user/setRole', newRole);
    },
  }
}
</script>