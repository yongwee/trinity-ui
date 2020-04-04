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
