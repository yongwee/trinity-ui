<template>
  <PageLayout>
    <q-form
      ref="form"
      @submit="submit"
      @reset="reset"
      @change="onFormChange"
    >
      <SectionHeader :header="$t('fxTokenOpenPosition.basicInformationSubSectionHeader')" />
      <div class="row q-gutter-sm q-mb-md">
        <q-select
          v-model="tokenType"
          outlined
          :options="tokenTypeOptions"
          class="col-4"
          :rules="[val => !!val || $t('fxTokenOpenPosition.createTokenTypeError')]"
          :label="$t('fxTokenOpenPosition.createTokenTypeInput')"
          @input="onFormChange"
        />
        <q-input
          v-model="tokenCode"
          outlined
          class="col-4"
          :rules="[val => !!val || $t('fxTokenOpenPosition.createTokenTokenCodeError')]"
          :label="$t('fxTokenOpenPosition.createTokenTokenCodeInput')"
        />
        <q-select
          v-model="fxCurrency"
          outlined
          :options="fxCurrencyOptions"
          class="col-6"
          :rules="[val => !!val || $t('fxTokenOpenPosition.createTokenFXCurrencyError')]"
          :label="$t('fxTokenOpenPosition.createTokenFXCurrenncyInput')"
        />
        <q-input
          v-model="currencyCode"
          outlined
          class="col-6"
          type="number"
          :rules="[val => validateInt(val) || $t('fxTokenOpenPosition.createTokenCurrencyCodeError')]"
          :label="$t('fxTokenOpenPosition.createTokenCurrencyCodeInput')"
        />
        <q-input
          v-model="amount"
          outlined
          class="col-6"
          type="number"
          step="0.01"
          :rules="[val => !!val && validateAmt(val) || $t('fxTokenOpenPosition.createTokenAmountError')]"
          :label="$t('fxTokenOpenPosition.createTokenAmountInput')"
        />
      </div>

      <SectionHeader :header="$t('fxTokenOpenPosition.issuanceInformationSubSectionHeader')" />
      <div class="row q-gutter-sm q-mb-sm">
        <q-select
          v-model="issuerId"
          outlined
          :options="issuerIdOptions"
          class="col-6"
          :rules="[val => !!val || $t('fxTokenOpenPosition.createTokenIssuerIdError')]"
          :label="$t('fxTokenOpenPosition.createTokenIssuerIdInput')"
        />
        <q-select
          v-model="issuingAddress"
          outlined
          :options="issuingAddressOptions"
          class="col-8"
          :rules="[val => !!val || $t('fxTokenOpenPosition.createTokenIssuingAddressError')]"
          :label="$t('fxTokenOpenPosition.createTokenIssuingAddressInput')"
        />

        <q-input
          v-model="spTokenCode"
          outlined
          class="col-6"
          :rules="[val => !!val || $t('fxTokenOpenPosition.createTokenSPTokenCodeError')]"
          :label="$t('fxTokenOpenPosition.createTokenSPTokenCodeInput')"
        />
      </div>

      <Subtitle :label="$t('fxTokenOpenPosition.uploaderLabel')" />

      <q-file
        v-model="file"
        outlined
        clearable
        :rules="[value => !!value || $t('fxTokenOpenPosition.uploaderError')]"
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
          <div>{{ $t('fxTokenOpenPosition.uploaderText') }}</div>
        </div>
      </q-file>

      <ActionBar />
    </q-form>

    <!-- dialogs -->
    <SubmissionDialog
      :submission-promise="submissionPromise"
    />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import SectionHeader from 'src/components/form/SectionHeader';
import Subtitle from 'src/components/form/Subtitle';
import ActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI } from 'src/config';

const amtRgx = /^\d*(\.\d{0,2})?$/; // 2 decimal places

export default {
  name: 'FXTokenOpenPositionCreateToken',
  components: {
    PageLayout,
    SectionHeader,
    Subtitle,
    ActionBar,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      tokenType: null,
      tokenTypeOptions: ['FX Token'],
      fxCurrency: null,
      fxCurrencyOptions: ['USD'],
      tokenCode: null,
      currencyCode: null,
      amount: null,

      issuerId: null,
      issuerIdOptions: ['EFGOPS1111'], // TODO: fetch proper values
      issuingAddress: null,
      issuingAddressOptions: ['4867s32acd7fbb1286ca34'], // TODO: fetch proper values
      spTokenCode: null,

      file: null,

      submissionPromise: null,
    };
  },
  created() {
    this.tokenType = this.tokenTypeOptions[0];
  },
  methods: {
    validateInt(val) {
      return Number.isInteger(Number.parseFloat(val, 10));
    },
    validateAmt(val) {
      return amtRgx.test(val);
    },
    submit() {
      const formData = new FormData();

      formData.append('tokenType', this.tokenType);
      formData.append('tokenCode', this.tokenCode);
      formData.append('amount', this.amount);
      formData.append('fxCurrency', this.fxCurrency);
      formData.append('currencyCode', this.currencyCode);

      formData.append('issuerAddress', this.issuingAddress);
      formData.append('issuerId', this.issuerId);
      formData.append('spTokenCode', this.spTokenCode);

      formData.append('file', this.file);

      const postDataPromise = this.$axios.post(URI.fxTokenIssue, formData);
      this.submissionPromise = postDataPromise;

      postDataPromise
        .then(() => {
          this.onSubmitSuccess();
        });
    },
    onSubmitSuccess() {
      this.resetForm();
    },
    reset() {
      this.tokenType = null;
      this.tokenCode = null;
      this.amount = null;
      this.fxCurrency = null;
      this.currencyCode = null;

      this.issuingAddress = null;
      this.issuerId = null;
      this.spTokenCode = null;

      this.isDirty = false;
    },
    resetForm() {
      this.$refs.form.reset();
    },
    onFormChange() {
      this.isDirty = true;
    },
  },
}
</script>

<style lang="scss" module>
</style>