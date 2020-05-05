<template>
  <q-dialog
    v-model="isShowing"
    persistent
  >
    <q-card>
      <q-card-section class="q-dialog__title">
        {{ title }}
      </q-card-section>
      <q-card-section class="q-dialog__message">
        {{ message }}
      </q-card-section>
      <q-card-actions class="row justify-end">
        <q-btn
          flat
          color="primary"
          :label="$t('sessionExpirationHelper.logOutBtnLabel')"
          :disable="isExtendingSession"
          @click="handleLogOut"
        />
        <q-btn
          v-if="!sessionExpired"
          flat
          color="primary"
          :loading="isExtendingSession"
          :label="$t('sessionExpirationHelper.extendSessionBtnLabel')"
          @click="handleExtendSession"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { LocalStorage } from 'quasar';
import { authTokens, routes, URI } from 'src/config';

export default {
  name: 'SessionExpirationHelper',
  data() {
    return {
      isShowing: false,
      isExtendingSession: false,
      expirationTimer: null,
    };
  },
  computed: {
    ...mapState({
      sessionExpired: state => state.user.sessionExpired,
    }),
    title() {
      return this.sessionExpired
        ? this.$t('sessionExpirationHelper.sessionExpiredTitle')
        : this.$t('sessionExpirationHelper.sessionExpiringTitle');
    },
    message() {
      return this.sessionExpired
        ? this.$t('sessionExpirationHelper.sessionExpiredMessage')
        : this.$t('sessionExpirationHelper.sessionExpiringMessage');
    },
  },
  watch: {
    sessionExpired: {
      handler(newSessionExpired, oldSessionExpired) {
        if (this.sessionExpired) {
          this.expirationTimer = clearTimeout(this.expirationTimer);
        }
        else if (!this.sessionExpired && !this.expirationTimer) {
          this.startSessionExpirationTimer();
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      clearUserData: 'user/clearData',
      fetchUserInfo: 'user/fetchUserInfo'
    }),
    ...mapMutations({
      setSessionAsExpired: 'user/setSessionAsExpired',
    }),
    /**
     * Starts the timer for checking session expiration.
     */
    startSessionExpirationTimer() {
      const { key, expiration, expirationWarning } = authTokens;

      const checkSessionExpiration = () => {
        const { createdAt = 0 } = LocalStorage.getItem(key) || {};

        const currentTime = +new Date();
        const elapsedTime = currentTime - createdAt;
        console.log('elapsedTime ', elapsedTime/1000/60)

        if (elapsedTime > expiration) {
          return this.showSessionExpired();
        }
        else if (elapsedTime > expirationWarning) {
          this.showSessionExpirationWarning()
        }
        else {
          this.isShowing = false;
        }

        this.expirationTimer = setTimeout(checkSessionExpiration, 3000);
      }

      checkSessionExpiration();
    },
    /**
     * Shows 'session is expiring' warning
     */
    showSessionExpirationWarning() {
      this.openDialog();
    },
    /**
     * Shows 'session has expired' warning
     */
    showSessionExpired() {
      this.openDialog();
      this.expirationTimer = clearTimeout(this.expirationTimer);

      this.setSessionAsExpired();
    },
    /**
     * Handles click event for extend session button.
     * Calls API to refresh access token and call helper methods to save it.
     */
    handleExtendSession() {
      const { username, refreshToken } = LocalStorage.getItem(authTokens.key) || {};

      this.isExtendingSession = true;

      this.$axios.post(URI.refreshToken, {
        username,
        refreshToken,
      })
        .then(({ data }) => {
          return this.applySessionExtension(data);
        })
        .then(() => {
          this.closeDialog();

          this.$q.dialog({
            title: this.$t('sessionExpirationHelper.sessionExtendedTitle'),
            message: this.$t('sessionExpirationHelper.sessionExtendedMessage'),
          });
        })
        .catch(() => {
          this.$q.dialog({
            title: this.$t('sessionExpirationHelper.sessionNotExtendedTitle'),
            message: this.$t('sessionExpirationHelper.sessionNotExtendedMessage'),
          });
        })
        .finally(() => {
          this.isExtendingSession = false;
        });
    },
    /**
     * Handles saving fresh access token into storage.
     * @param {string} newAccessToken
     */
    applySessionExtension(newAccessToken) {
      const storageKey = authTokens.key;

      const oldTokens = LocalStorage.getItem(storageKey);
      LocalStorage.set(storageKey, {
        ...oldTokens,
        accessToken: newAccessToken,
        createdAt: +new Date(),
      });

      return this.fetchUserInfo(true);
    },
    /**
     * Handles clicking of the log out button
     */
    handleLogOut() {
      this.clearUserData();
      this.closeDialog();
      this.$router.push({ name: routes.login.name });
    },
    /**
     * Opens dialog.
     */
    openDialog() {
      this.isShowing = true;
    },
    /**
     * Closes dialog.
     */
    closeDialog() {
      this.isShowing = false;
    },
  },
}
</script>