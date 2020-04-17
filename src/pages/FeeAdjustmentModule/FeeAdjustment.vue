<template>
  <PageLayout
    :is-loading="isLoading"
    :has-error="hasError"
    :retry="fetchBrokerData"
  >
    <q-form
      ref="form"
      @submit="submit"
      @reset="reset"
      @change="onFormChange"
    >
      <div class="row q-gutter-sm q-mb-sm">
        <q-select
          v-model="client"
          outlined
          :options="clientOptions"
          :label="$t('feeAdjustment.clientSelectLabel')"
          class="col-3"
          :rules="[val => !!val || $t('feeAdjustment.clientSelectError')]"
          @input="onFormChange"
        />
        <q-select
          v-model="broker"
          outlined
          :options="brokerOptions"
          :label="$t(brokerSelectLabel)"
          class="col-4"
          :rules="[val => !!val || $t('feeAdjustment.brokerSelectError')]"
          @input="onFormChange"
        />
        <q-select
          v-model="market"
          outlined
          :options="marketOptions"
          :label="$t('feeAdjustment.marketSelectLabel')"
          class="col-3"
          :rules="[val => !!val || $t('feeAdjustment.marketSelectError')]"
          @input="onFormChange"
        />
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
import { mapState, mapActions } from 'vuex';
import PageLayout from 'src/components/PageLayout';
import FormSectionHeader from 'src/components/form/SectionHeader';
import FormActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI, role } from 'src/config';

const clientOptions = [
  'Eastspring',
];

const marketOptions = [
  'ETD',
];


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
      isLoading: false,
      hasError: false,

      files: null,
      clientOptions,
      marketOptions,

      client: clientOptions[0],
      broker: null,
      market: marketOptions[0],

      submissionState: null,
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.user.role,
      brokers: state => state.business.brokers,
    }),
    brokerSelectLabel() {
      return this.isCPBroker
        ? 'feeAdjustment.exBrokerSelectLabel'
        : 'feeAdjustment.cpBrokerSelectLabel'
    },
    brokerOptions() {
      if (!this.brokers) return [];

      return this.brokers.map(option => {
        return {
          label: this.isCPBroker
            ? `${option.exBrokerCoyName} — ${option.exBrokerCode}`
            : `${option.cpBrokerCoyName} — ${option.cpBrokerCode}`,
          value: this.isCPBroker
            ? option.exBrokerCode
            : option.cpBrokerCode,
        };
      });
    },
    isCPBroker() {
      return this.userRole === role.counterParty;
    },
  },
  created() {
    this.fetchBrokerData();
  },
  methods: {
    ...mapActions({
      fetchBrokers: 'business/fetchBrokers',
    }),
    /**
     * Fetches broker data and populates broker select
     */
    fetchBrokerData() {
      this.isLoading = true;
      this.hasError = false;

      this.fetchBrokers()
        .catch(err => {
          this.hasError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
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

      const brokerType = this.isCPBroker
        ? 'ExBroker'
        : 'CpBroker';

      const formData = new FormData();
      formData.append(brokerType, this.broker.value);
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
      this.client = null;
      this.broker = null;
      this.market = null;
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
