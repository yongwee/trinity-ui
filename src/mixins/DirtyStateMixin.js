import { mapState } from 'vuex';

const DirtyMixin = {
  data() {
    return {
      isDirty: false,
      dirtyDialog: null,
    }
  },
  computed: {
    ...mapState({
      sessionExpired: state => state.user.sessionExpired,
    }),
  },
  methods: {
    /**
     * @public
     * Shows dirty state dialog if isDirty is true,
     * otherwise invoke the `next` function immediately.
     *
     * @param {Function} next
     */
    confirmLeaveIfDirty(next) {
      this.isDirty
        ? this.showDirtyStateDialog(next)
        : next(true);
    },
    /**
     * Shows a dirty state dialog that confirms with user if they
     * want to leave. If OK is chosen, the `next` function will be invoked
     *
     * @param {Function} next
     */
    showDirtyStateDialog(next) {
      if (!!this.dirtyDialog) {
        return;
      }

      this.isShowingDirty = true;

      this.dirtyDialog = this.$q.dialog({
        title: this.$t('mixins.dirtyState.title'),
        message: this.$t('mixins.dirtyState.message'),
        persistent: true,
        ok: {
          label: this.$t('mixins.dirtyState.ok'),
          flat: true,
        },
        cancel: {
          label: this.$t('mixins.dirtyState.cancel'),
          flat: true,
        },
        focus: 'none',
      })
        .onOk(() => {
          this.isDirty = false;
          next(true);
        })
        .onCancel(() => {
          next(false);
        })
        .onDismiss(() => {
          this.dirtyDialog = null;
        });
    },
    /**
     * Custom hook to be run before main body of beforeRouteLeave does.
     * This is meant to be overridden from component.
     * Return `true` to continue running main body.
     * @returns {Boolean} - continue flag
     */
    preBeforeRouteLeave() {
      return true;
    },
  },
  beforeRouteLeave(to, from, next) {
    // Ignore dirty logic if session has already expired
    // and user is being re-routed to login.
    if (this.sessionExpired) {
      this.dirtyDialog && this.dirtyDialog.hide();
      return next();
    }

    if (this.preBeforeRouteLeave(to, from, next)) {
      this.confirmLeaveIfDirty(next);
    }
  },
}

export default DirtyMixin;
