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
        <q-form
          ref="form"
          @reset="onReset"
          @submit="onSubmit"
          @change="onFormChange"
        >
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
            <div
              v-if="!file"
              class="col-12 row flex-center text-grey-8 non-selectable full-height"
            >
              <q-icon
                class="q-mr-sm"
                name="mdi-cloud-upload-outline"
                size="md"
              />
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
          <q-card
            flat
            bordered
            class="q-mb-xl"
          >
            <q-card-section class="row flex-center">
              <q-icon
                name="mdi-file-document-outline"
                size="sm"
                class="q-mr-sm"
              />
              <!-- TODO: show actual file name and fix download url -->
              <span>enriched_trade.csv</span>
              <q-space />
              <a
                href="http://downloadlinkhere"
                download
                :class="$style.downloadAnchor"
              >
                <q-btn
                  color="secondary"
                  unelevated
                  label="Download"
                />
              </a>
            </q-card-section>
          </q-card>

          <q-separator class="q-mb-lg" />

          <div class="row justify-end">
            <q-btn
              color="primary"
              flat
              label="Back"
              @click="onBack()"
            />
          </div>
        </div>
      </q-step>
    </q-stepper>


    <!-- dialogs -->
    <SubmissionDialog
      :state.sync="submissionState"
      :success-label="$t('tradeEnrichment.successLabel')"
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
  name: 'TradeEnrichment',
  components: {
    PageLayout,
    FormSectionHeader,
    FormActionBar,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      file: null,
      submissionState: null,
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
     * Handles back button press to show confirmation and go back one step
     * if user confirms it
     */
    onBack(next) {
      this.$q.dialog({
        title: $t('tradeEnrichment.goBackDialogTitle'),
        message: $t('tradeEnrichment.goBackDialogMessage'),
        ok: {
          label: $t('tradeEnrichment.goBackDialogOk'),
          flat: true,
        },
        cancel: true,
        focus: 'none',
      })
        .onOk(() => {
          next
            ? next()
            : this.step--;
        })
        .onCancel(() => {
          next(false);
        });
    },
    /**
     * Runs dirty state's navigation guard if step is at 1,
     * otherwise show goback confirmation.
     * @override
     */
    preBeforeRouteLeave(_to, _from, next) {
    if (this.step === 1) {
        return true;
      }

      this.onBack(next);
    },
  },

}
</script>

<style lang="scss" module>
.downloadAnchor {
  text-decoration: none;
}
</style>
