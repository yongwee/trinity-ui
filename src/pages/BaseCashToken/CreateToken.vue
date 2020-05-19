<template>
  <PageLayout>
    <q-form
      ref="form"
      @submit="submit"
      @reset="reset"
      @change="onFormChange"
    >
      <SectionHeader :header="$t('baseCashToken.basicInformationSubSectionHeader')" />
      <InputLayout class="q-mb-sm">
        <q-select
          v-model="tokenType"
          outlined
          :options="tokenTypeOptions"
          class="col-4"
          :rules="[val => !!val || $t('baseCashToken.createTokenTypeError')]"
          :label="$t('baseCashToken.createTokenTypeInput')"
          @input="onFormChange"
        />
        <q-input
          v-model="tokenCode"
          outlined
          class="col-4"
          :rules="[val => !!val || $t('baseCashToken.createTokenTokenCodeError')]"
          :label="$t('baseCashToken.createTokenTokenCodeInput')"
        />
        <q-input
          v-model="underlying"
          outlined
          class="col-6"
          :rules="[val => !!val || $t('baseCashToken.createTokenUnderlyingError')]"
          :label="$t('baseCashToken.createTokenUnderlyingInput')"
        />
        <q-input
          v-model="currencyCode"
          outlined
          class="col-6"
          :rules="[val => !!val || $t('baseCashToken.createTokenCurrencyCodeError')]"
          :label="$t('baseCashToken.createTokenCurrencyCodeInput')"
        />
        <q-input
          v-model="amount"
          outlined
          class="col-6"
          type="number"
          step="0.01"
          :rules="[val => !!val || $t('baseCashToken.createTokenAmountError')]"
          :label="$t('baseCashToken.createTokenAmountInput')"
        />
      </InputLayout>

      <SectionHeader :header="$t('baseCashToken.issuanceInformationSubSectionHeader')" />
      <InputLayout class="q-mb-sm">
        <q-input
          v-model="issuerId"
          outlined
          class="col-6"
          :rules="[val => !!val || $t('baseCashToken.createTokenIssuerIdError')]"
          :label="$t('baseCashToken.createTokenIssuerIdInput')"
        />
        <q-input
          v-model="issuingAddress"
          outlined
          class="col-8"
          :rules="[val => !!val || $t('baseCashToken.createTokenIssuingAddressError')]"
          :label="$t('baseCashToken.createTokenIssuingAddressInput')"
        />
      </InputLayout>

      <Subtitle :label="$t('baseCashToken.uploaderLabel')" />

      <q-file
        v-model="file"
        outlined
        clearable
        :rules="[value => !!value || $t('baseCashToken.uploaderError')]"
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
          <div>{{ $t('baseCashToken.uploaderText') }}</div>
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
import InputLayout from 'src/components/form/InputLayout';
import ActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI } from 'src/config';

export default {
  name: 'BaseCashTokenCreateToken',
  components: {
    PageLayout,
    SectionHeader,
    Subtitle,
    InputLayout,
    ActionBar,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      tokenType: null,
      tokenTypeOptions: ['Base Cash'],
      underlying: null,
      tokenCode: null,
      currencyCode: null,
      amount: null,

      issuerId: null,
      issuingAddress: null,

      file: null,

      submissionPromise: null,
    };
  },
  methods: {
    submit() {
      const formData = new FormData();

      formData.append('tokenType', this.tokenType);
      formData.append('tokenCode', this.tokenCode);
      formData.append('amount', this.amount);
      formData.append('underlying', this.underlying);
      formData.append('currencyCode', this.currencyCode);

      formData.append('issuerAddress', this.issuingAddress);
      formData.append('issuerId', this.issuerId);

      formData.append('file', this.file);

      const postDataPromise = this.$axios.post(URI.baseCashTokenIssue, formData);
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
      this.underlying = null;
      this.currencyCode = null;

      this.issuingAddress = null;
      this.issuerId = null;

      this.isDirty = false;
    },
    resetForm() {
      this.$refs.form.reset();
    },
    onFormChange() {
      this.isDirty = true;
    },
  }
}
</script>

<style lang="scss" module>
</style>
