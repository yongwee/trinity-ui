const DirtyMixin = {
  data() {
    return {
      isDirty: false,
    }
  },
  methods: {
    /**
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
      this.$q.dialog({
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
    if (this.preBeforeRouteLeave(to, from, next)) {
      this.confirmLeaveIfDirty(next);
    }
  },
}

export default DirtyMixin;
