<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
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
          v-model="brokerPair"
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

      <FormSubtitle :label="$t('feeAdjustment.importAsCsv')" />

      <q-file
        v-model="files"
        outlined
        accept=".csv"
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
      :submission-promise="submissionPromise"
      :success-label="$t('feeAdjustment.successLabel')"
    />
  </PageLayout>
</template>

<script>
import { mapState } from 'vuex';
import PageLayout from 'src/components/PageLayout';
import FormSubtitle from 'src/components/form/Subtitle';
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
    FormSubtitle,
    FormActionBar,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      loadingDataPromise: null,

      files: null,
      clientOptions,
      marketOptions,
      brokers: null,

      client: clientOptions[0],
      brokerPair: null,
      market: marketOptions[0],

      submissionPromise: null,
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.user.role,
      userBrokerCode: state => state.user.brokerCode,
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
          value: option,
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
    /**
     * Fetches broker data and populates broker select
     */
    fetchBrokerData() {
      this.loadingDataPromise = this.$axios.get(URI.brokerByCode.replace('{brokerCode}', this.userBrokerCode));
      this.loadingDataPromise
        .then(({ data }) => {
          this.brokers = data;
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
      const { exBrokerCode, cpBrokerCode } = this.brokerPair.value;

      const formData = new FormData();
      formData.append('ExBroker', exBrokerCode);
      formData.append('CpBroker', cpBrokerCode);
      formData.append('file', this.files);

      const postDataPromise = this.$axios.post(URI.feeSchedule, formData);
      this.submissionPromise = postDataPromise;
      postDataPromise
        .then(res => {
          this.onSubmitSuccessful();
        });
    },
    /**
     * Handles successful submission.
     */
    onSubmitSuccessful() {
      this.resetForm();
    },
    /**
     * Resets form.
     */
    resetForm() {
      this.$refs.form.reset();
    },
    reset() {
      this.files = null;
      // this.client = null; // commented out because there's only one pre-selected option for now
      this.brokerPair = null;
      // this.market = null;
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
