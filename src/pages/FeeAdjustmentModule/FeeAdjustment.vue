<template>
  <PageLayout>
    <q-form
      ref="form"
      @submit="submit"
      @reset="reset"
      @change="onFormChange"
    >
      <!-- <div class="row q-gutter-md q-mb-lg">
        <q-select outlined v-model="client" :options="clientOptions" label="Client" class="col-6 q-mr-sm" />
        <q-select outlined v-model="market" :options="marketOptions" label="Market" class="col-6" />
      </div> -->

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
        <div
          v-if="!files"
          class="col-12 row flex-center text-grey-8 non-selectable full-height"
        >
          <q-icon
            class="q-mr-sm"
            name="mdi-cloud-upload-outline"
            size="md"
          />
          <div>{{ $t('feeAdjustment.uploaderText') }}</div>
        </div>
      </q-file>

      <FormActionBar />
    </q-form>


    <!-- dialogs -->
    <SubmissionDialog
      :state.sync="submissionState"
      :success-label="$t('feeAdjustment.successLabel')"
    />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import FormSectionHeader from 'src/components/form/SectionHeader';
import FormActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI } from 'src/config';

export default {
  name: 'FeeAdjustment',
  components: {
    PageLayout,
    FormSectionHeader,
    FormActionBar,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
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
      submissionState: null,
    }
  },
  methods: {
    /**
     * Event handler that sets dirty state when form is updated.
     */
    onFormChange() {
      this.isDirty = true;
    },
    /**
     * Handles form submission.
     */
    submit() {
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
    /**
     * Handles successful submission.
     */
    onSubmitSuccessful() {
      this.submissionState = 'success';
      this.resetForm();
    },
    /**
     * Handles failed submision.
     */
    onSubmitFailure() {
      this.submissionState = 'failure';
      // We do not reset form here so that user may attempt a resubmission
    },
    /**
     * Resets form.
     */
    resetForm() {
      this.$refs.form.reset();
    },
    reset() {
      this.files = null;
      this.isDirty = false;
    },
  },
}
</script>

<style lang="scss" module>
.selectInput {
  width: 300px;
}
</style>
