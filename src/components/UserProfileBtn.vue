<template>
  <div>
    <span class="text-weight-bold q-mr-md">{{ welcomeMessage }}</span>
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
        <q-card-section>
          <q-btn
            type="submit"
            flat
            color="primary"
            label="Logout"
            @click="handleLogout"
          />
        </q-card-section>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserProfileBtn',
  computed: {
    ...mapState({
      name: state => state.user.name,
    }),
    welcomeMessage() {
      return this.$t('userProfileBtn.welcomeMessage', { name: this.name });
    },
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    ...mapActions({
      fetchUserInfo: 'user/fetchUserInfo',
      logout: 'user/logout',
    }),
    handleLogout() {
      this.logout(this.$router);
    },
  },
}
</script>