<template>
  <q-dialog
    v-model="showDialog"
    persistent
  >
    <q-card>
      <q-card-section class="column flex-center">
        <div class="text-h6 q-mb-lg">Discard unsaved changes?</div>
        <div>You have unsaved changes. Are you sure you want to leave without saving?</div>
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn flat color="primary" label="Cancel" @click="doStay" />
        <q-btn  flat color="negative" label="Discard" @click="doDiscard" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
/**
 * DirtyState component hijacks an exit (moving away from a page, closing a
 * dialog box etc.) and shows a confirmation to user to make sure they really
 * want to exit as they'll lose the changes that they have made on that page/dialog/etc.
 * 
 * Parent will have to set the `isDirty` prop
 * Parent can trigger the dialog by setting the `value` prop (v-model) with an
 * exit function (e.g. `next` function provided by vue-router navigation guards or
 * the close function that closes a dialog box).
 * 
 * DirtyState dialog will automatically show when a value is set and if `isDirty` is true
 */
export default {
  name: 'DirtyState',
  data() {
    return {
      showDialog: false,
      goNext: null, // function to be assigned in route guard
    };
  },
  props: {
    value: {
      type: Function, // will be assigned to goNext
    },
    isDirty: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    value(val) {
      this.goNext = val;
    },
    /**
     * Invoke showWarningOrProceed if goNext is not null,
     * otherwise hide warning dialog.
     */
    goNext() {
      this.goNext
        ? this.showWarningOrProceed()
        : this.doHideWarningDialog();
    },
  },
  methods: {
    /**
     * Checks dirty state. Shows warning dialog if dirty.
     * Invokes goNext if not
     */
    showWarningOrProceed() {
      this.isDirty
        ? this.doShowWarningDialog()
        : this.goNext();
    },
    /**
     * Shows warning dialog.
     */
    doShowWarningDialog() {
      this.showDialog = true;
    },
    /**
     * Hides warning dialog.
     */
    doHideWarningDialog() {
      this.showDialog = false;
    },
    /**
     * Hides warning dialog and stay
     */
    doStay() {
      this.$emit('input', null);
    },
    /**
     * Hides warning dialog and goes to next page.
     */
    doDiscard() {
      this.doHideWarningDialog();
      this.$emit('update:isDirty', false);

      if (this.goNext) {
        this.goNext();
      }
    }
  },
}
</script>

<style lang="scss" module>
</style>
