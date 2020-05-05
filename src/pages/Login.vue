<template>
  <main
    :class="$style.container"
    class="row flex-center absolute-full"
  >
    <q-card>
      <q-card-section class="q-px-xl q-pt-xl">
        <img
          :class="$style.logo"
          alt="STACS logo"
          src="~assets/stacs_logo.png"
        >
      </q-card-section>

      <q-card-section>
        <q-form
          greedy
          @submit="login"
        >
          <div class="column items-stretch q-gutter-xs">
            <div
              v-if="!!loginError"
              class="text-negative"
            >
              {{ loginError }}
            </div>
            <q-input
              v-model="username"
              outlined
              :label="$t('login.usernameInputLabel')"
              :disable="isLoggingIn"
              :rules="[ val => !!val || $t('login.usernameInputErrorLabel')]"
            />
            <q-input
              v-model="password"
              outlined
              :label="$t('login.passwordInputLabel')"
              :disable="isLoggingIn"
              :rules="[ val => !!val || $t('login.passwordInputErrorLabel')]"
              type="password"
            />

            <q-btn
              color="primary"
              :loading="isLoggingIn"
              :label="$t('login.loginBtnLabel')"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </main>
</template>

<script>
import { LocalStorage } from 'quasar';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import { routes, URI } from 'src/config';

export default {
  name: 'StacsLogin',
  data() {
    return {
      username: '',
      password: '',
      loginError: '',
      isLoggingIn: false,
    };
  },
  computed: {
    ...mapState({
      defaultRoute: state => state.user.defaultRoute,
    }),
  },
  watch: {
    defaultRoute: {
      handler() {
        this.goToDefaultRoute();
      },
      immediate: true,
    }
  },
  methods: {
    ...mapActions({
      fetchUserInfo: 'user/fetchUserInfo',
    }),
    /**
     * Handles login process.
     */
    login() {
      this.loginError = '';
      this.isLoggingIn = true;

      const loginPayload = {
        username: this.username,
        password: this.password,
      };

      // Use a clean instace of axios here because we do not want the injected customs of this.$axios
      axios.post(URI.login, loginPayload)
        .then(({ data }) => {
          const { idToken, accessToken, refreshToken, session } = data;

          const tokens = {
            username: this.username,
            idToken,
            accessToken,
            refreshToken,
            session,
            createdAt: +Date.now(),
          };

          LocalStorage.set('tokens', tokens);

          return this.fetchUserInfo()
        })
        .catch(err => {
          const { response } = err;

          if (response && response.status < 500) {
            this.loginError = this.$t('login.invalidCredentialsErrorLabel');
          }
          else {
            this.loginError = this.$t('login.serverErrorLabel');
          }
        })
        .finally(() => {
          this.isLoggingIn = false;
        });
    },
    /**
     * Routes user to their default page after being logged in.
     */
    goToDefaultRoute() {
      const defaultRoute = this.defaultRoute;

      if (!defaultRoute) {
        return;
      }

      this.$router.replace(defaultRoute);
    },
  },
}
</script>

<style lang="scss" module>
.container {
  background-color: $primary;
}

.logo {
  height: 100px;
}
</style>