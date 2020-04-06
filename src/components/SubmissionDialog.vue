<template>
  <q-dialog :value="shouldDisplay" persistent>
    <q-card
      class="column flex-center q-pt-md"
      :class="$style.container"
    >
      <q-card-section class="column flex-center">
        <div class="q-mb-lg">
          <transition name="fade" mode="out-in">
            <span v-if="isSubmitting" key="spinner">
              <q-spinner color="primary" size="xl" />
            </span>
            <div
              v-else class="q-pa-lg"
              :class="{
                [$style.iconContainer]: true,
                [$style.failureIconContainer]: !isSuccessful
              }"
              key="doneIcon"
            >
              <q-icon v-if="isSuccessful" name="mdi-check" size="xl" />
              <q-icon v-else name="mdi-close" size="xl" />
            </div>
          </transition>
        </div>

        <div v-if="isSubmitting" class="text-grey-9">{{ submittingLabel }}</div>
        <template v-else>
          <div class="text-h6">{{ isSuccessful ? successTitle : failureTitle }}</div>
          <div class="text-grey-9 text-caption">{{ isSuccessful
              ? successLabel
              : failureLabel
            }}</div>
        </template>
      </q-card-section>

      <q-card-actions v-if="!isSubmitting">
        <q-btn color="primary" flat label="OK" @click="onOk" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
const stateType = {
  submitting: 'submitting',
  success: 'success',
  failure: 'failure',
};

/**
 * SubmissionDialog shows the status of submission (usually by forms)
 * It is automatically triggered to show by setting the 'state' prop to one of
 * values defined by the `stateType` map above.
 */
export default {
  name: 'SubmissionDialog',
  props: {
    /**
     * state prop
     * @values 'submitting', 'success', 'failure'
     */ 
    state: {
      type: String,
      default: '',
    },
    submittingLabel: {
      type: String,
      default: function() {
        return this.$t('components.submissionDialog.submitting');
      },
    },
    successTitle: {
      type: String,
      default: function() {
        return this.$t('components.submissionDialog.successTitle');
      },
    },
    successLabel: {
      type: String,
      default: function() {
        return this.$t('components.submissionDialog.successLabel');
      },
    },
    failureTitle: {
      type: String,
      default: function() {
        return this.$t('components.submissionDialog.failureTitle');
      },
    },
    failureLabel: {
      type: String,
      default: function() {
        return this.$t('components.submissionDialog.failureLabel');
      },
    },
  },
  computed: {
    isSubmitting() {
      return this.state === stateType.submitting;
    },
    isSuccessful() {
      return this.state === stateType.success;
    },
    isFailed() {
      return this.state === stateType.failure;
    },
    shouldDisplay() {
      return this.isSubmitting || this.isSuccessful || this.isFailed;
    },
  },
  methods: {
    onOk() {
      this.$emit('update:state', null);
    },
  },
}
</script>

<style lang="scss" module>
.container {
  min-width: 300px;
  min-height: 200px;
}

.iconContainer {
  background: $positive;
  border-radius: 50%;
  color: white;
}

.failureIconContainer {
  background: $negative;
}
</style>
