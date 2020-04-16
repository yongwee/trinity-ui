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

        <q-separator />

        <q-item-label header>
          Test login
        </q-item-label>
        <q-card-section>
          <q-form @submit="login">
            <q-input
              v-model="username"
              label="username"
            />
            <q-input
              v-model="password"
              class="q-mb-sm"
              label="password"
              type="password"
            />
            <q-btn
              type="submit"
              :loading="isLoggingIn"
              color="primary"
              label="login"
            />
          </q-form>
        </q-card-section>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar';
import { mapState } from 'vuex';
import { role } from 'src/config';

export default {
  name: 'UserProfileBtn',
  data() {
    return {
      items: Array.from(Object.values(role)),

      // Login
      isLoggingIn: false,
      username: '',
      password: '',
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
    login() {
      this.isLoggingIn = true;

      // this.$axios.post('http://trinity-auth.ap-southeast-1.elasticbeanstalk.com/auth', {
      this.$axios.post('http://localhost:4444/auth', {
        username: this.username,
        password: this.password,
      })
        .then(({ data }) => {
          const { idToken, accessToken, session } = data;

          idToken && LocalStorage.set('idToken', idToken);
          accessToken && LocalStorage.set('accessToken', accessToken);
          session && LocalStorage.set('session', session);

          this.$q.notify({
            color: 'positive',
            message: 'Login succeeded',
            position: 'top',
          });
        })
        .catch(err => {
          console.log('login err: ', err)
          this.$q.notify({
            color: 'negative',
            message: 'Login failed',
            position: 'top',
          });
        })
        .finally(() => {
          this.isLoggingIn = false;
        });
    }
  }
}
</script>