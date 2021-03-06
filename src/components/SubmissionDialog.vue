<template>
  <q-dialog
    :value="shouldDisplay"
    persistent
  >
    <q-card
      class="column flex-center q-pt-md"
      :class="$style.container"
    >
      <q-card-section class="column flex-center">
        <transition
          name="fade"
          mode="out-in"
        >
          <span
            v-if="isSubmitting"
            key="spinner"
          >
            <q-spinner
              color="primary"
              size="xl"
            />
          </span>
          <div
            v-else
            key="doneIcon"
            class="q-pa-lg"
            :class="{
              [$style.iconContainer]: true,
              [$style.failureIconContainer]: !isSuccessful
            }"
          >
            <q-icon
              v-if="isSuccessful"
              name="mdi-check"
              size="xl"
            />
            <q-icon
              v-else
              name="mdi-close"
              size="xl"
            />
          </div>
        </transition>
      </q-card-section>

      <q-card-section>
        <div
          v-if="isSubmitting"
          class="text-grey-9"
        >
          {{ submittingLabel }}
        </div>
        <div
          v-else
          class="text-h6"
        >
          {{ isSuccessful ? successTitle : failureTitle }}
        </div>
      </q-card-section>

      <q-card-section
        v-if="!isSubmitting"
        class="q-pt-none q-dialog__message"
      >
        {{ isSuccessful
          ? successLabel
          : failureLabel
        }}
      </q-card-section>

      <q-card-actions v-if="!isSubmitting">
        <q-btn
          color="primary"
          flat
          label="OK"
          @click="onOk"
        />
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
    submissionPromise: {
      type: Promise,
      default: null,
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
  data() {
    return {
      state: null,
    }
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
  watch: {
    submissionPromise() {
      this.state = stateType.submitting;

      this.submissionPromise
        .then(() => {
          this.state = stateType.success;
        })
        .catch(() => {
          this.state = stateType.failure;
        });
    },
  },
  methods: {
    onOk() {
      const okEvent = this.isSuccessful ? 'successOk' : 'failedOk';
      this.state = null;
      window.setTimeout(() => this.$emit(okEvent), 300); // Defer to let dialog finish closing animation
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
