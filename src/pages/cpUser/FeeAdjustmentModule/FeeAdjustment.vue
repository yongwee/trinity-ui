<template>
  <PageLayout :title="$t('feeAdjustment.title')">
    <q-form @submit="submit" @reset="reset" @change="onFormChange" ref="form">
      <div class="row q-gutter-md q-mb-lg">
        <q-select outlined v-model="client" :options="clientOptions" label="Client" class="col-6 q-mr-sm" />
        <q-select outlined v-model="market" :options="marketOptions" label="Market" class="col-6" />
      </div>

      <FormSectionHeader
        :header="$t('feeAdjustment.addScheduleLabel')"
        :caption="$t('feeAdjustment.importAsCsv')"
      />

      <q-file
        v-model="files"
        outlined
        accept="text/csv"
        clearable
        :rules="[value => !!value || $t('feeAdjustment.uploaderError')]"
      >
        <div v-if="!files" class="col-12 row flex-center text-grey-8 non-selectable full-height">
          <q-icon class="q-mr-sm" name="mdi-cloud-upload-outline" size="md" />
          <div>{{ $t('feeAdjustment.uploaderText') }}</div>
        </div>
      </q-file>

      <FormActionBar />
    </q-form>


    <!-- dialogs -->
    <SubmissionDialog :state.sync="submissionState" :successLabel="$t('feeAdjustment.successLabel')" />

    <DirtyState :isDirty.sync="isDirty" v-model="goNext" />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import FormSectionHeader from 'src/components/form/SectionHeader';
import FormActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyState from 'src/components/DirtyState';
import { URI } from 'src/config';

export default {
  name: 'FeeAdjustment',
  data() {
    return {
      files: null,
      clientOptions: [
        'Eastspring',
      ],
      marketOptions: [
        'ETD',
      ],
      client: null,
      market: null,
      hasFiles: false,
      goNext: null,
      isDirty: false,
      submissionState: null,
    }
  },
  methods: {
    addedFiles() {
      this.hasFiles = true;
    },
    removedFiles() {
      this.hasFiles = false;
    },
    onFormChange() {
      this.isDirty = true;
    },
    submit(e) {
      this.submissionState = 'submitting';

      const formData = new FormData();
      formData.append('file', this.files);

      this.$axios.post(URI.feeSchedule, formData)
        .then(res => {
          this.onSubmitSuccessful();
        })
        .catch(() => {
          this.onSubmitFailure();
        });
    },
    onSubmitSuccessful() {
      this.submissionState = 'success';
      this.onSubmitDone();
    },
    onSubmitFailure() {
      this.submissionState = 'failure';
      // We do not reset form here so that user may attempt a resubmission
    },
    onSubmitDone() {
      this.$refs.form.reset();
    },
    reset() {
      this.files = null;
      this.isDirty = false;
    },
    /**
     * Triggers dirty dialog if state is dirty
     * otherwise continue to go next state as per normal
     *
     * @param {Function} next - function to trigger next state
     */
    confirmExitIfDirty(next) {
      this.goNext = next;
    }
  },
  components: {
    PageLayout,
    FormSectionHeader,
    FormActionBar,
    SubmissionDialog,
    DirtyState,
  },
  beforeRouteLeave(_to, _from, next) {
    this.confirmExitIfDirty(next);
  }
}
</script>

<style lang="scss" module>
.selectInput {
  width: 300px;
}
</style>
