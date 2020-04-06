<template>
  <PageLayout :title="$t('tradeEnrichment.title')">
    <q-stepper
      v-model="step"
      color="primary"
      animated
      flat
    >
      <q-step
        :name="1"
        :title="$t('tradeEnrichment.stepUploadTrade')"
        icon="mdi-cloud-upload"
      >
        <q-form ref="form" @reset="onReset" @submit="onSubmit" @change="onFormChange">
          <FormSectionHeader
            :header="$t('tradeEnrichment.uploadTrade')"
            :caption="$t('tradeEnrichment.importAsXml')"
          />

          <q-file
            v-model="file"
            outlined
            accept="text/xml, application/xml"
            clearable
            :rules="[value => !!value || $t('tradeEnrichment.uploaderError')]"
          >
            <div v-if="!file" class="col-12 row flex-center text-grey-8 non-selectable full-height">
              <q-icon class="q-mr-sm" name="mdi-cloud-upload-outline" size="md" />
              <div>{{ $t('tradeEnrichment.uploaderText') }}</div>
            </div>
          </q-file>

          <FormActionBar />
        </q-form>
      </q-step>

      <q-step
        :name="2"
        :title="$t('tradeEnrichment.stepDownloadEnrichedTrade')"
        icon="mdi-cloud-download-outline"
      >
        <div>
          <FormSectionHeader
            :header="$t('tradeEnrichment.downloadEnrichedTrade')"
            :caption="$t('tradeEnrichment.downloadEnrichedTradeCaption')"
          />
          <q-card flat bordered class="q-mb-xl">
            <q-card-section class="row flex-center">
              <q-icon name="mdi-file-document-outline" size="sm" class="q-mr-sm" />
              <!-- TODO: show actual file name and fix download url -->
              <span>enriched_trade.csv</span>
              <q-space />
              <a href="http://downloadlinkhere" download :class="$style.downloadAnchor">
                <q-btn color="secondary" unelevated label="Download" />
              </a>
            </q-card-section>
          </q-card>

          <q-separator class="q-mb-lg" />

          <div class="row justify-end">
            <q-btn color="primary" flat label="Back" @click="onBack" />
          </div>
        </div>
      </q-step>
    </q-stepper>


    <!-- dialogs -->
    <SubmissionDialog :state.sync="submissionState" :successLabel="$t('tradeEnrichment.successLabel')" />

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
  name: 'TradeEnrichment',
  data() {
    return {
      file: null,
      submissionState: null,
      isDirty: false,
      goNext: null,
      step: 1,
    };
  },
  methods: {
    /**
     * Handles trade enrich submission.
     */
    onSubmit() {
      this.submissionState = 'submitting';

      const formData = new FormData();
      formData.append('file', this.file);

      this.$axios.post(URI.tradeEnrich, formData)
        .then(() => {
          this.onSubmitSuccess();
        })
        .catch(() => {
          this.onSubmitFailure();
        });
    },
    /**
     * Handles successful submission.
     */
    onSubmitSuccess() {
      this.submissionState = 'success';
      this.resetForm();
      // TODO: switch form to show download for CSV
      this.step++;
    },
    /**
     * Handles failed submission.
     */
    onSubmitFailure() {
      this.submissionState = 'failure';
    },
    /**
     * Reset handler hooked to form's reset event.
     */
    onReset() {
      this.file = null;
      this.isDirty = false;
    },
    /**
     * Resets form.
     */
    resetForm() {
      this.$refs.form.reset();
    },
    /**
     * Event handler that sets dirty state when form is updated.
     */
    onFormChange() {
      this.isDirty = true;
    },
    /**
     * Handles back button press to go back one step
     */
    onBack() {
      this.step--;
    },
    confirmExitIfDirty(next) {
      this.goNext = next;
    },
  },
  beforeRouteLeave(_to, _from, next) {
    this.confirmExitIfDirty(next);
  },
  components: {
    PageLayout,
    FormSectionHeader,
    FormActionBar,
    SubmissionDialog,
    DirtyState,
  },

}
</script>

<style lang="scss" module>
.downloadAnchor {
  text-decoration: none;
}
</style>
