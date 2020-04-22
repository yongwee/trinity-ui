<template>
  <PageLayout>
    <q-form
      ref="form"
      @submit="submit"
      @reset="reset"
      @change="onFormChange"
    >
      <SectionHeader :header="$t('baseCashToken.basicInformationSubSectionHeader')" />
      <div class="row q-gutter-sm q-mb-md">
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
      </div>

      <SectionHeader :header="$t('baseCashToken.issuanceInformationSubSectionHeader')" />
      <div class="row q-gutter-sm q-mb-sm">
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
      </div>

      <Subtitle :label="$t('baseCashToken.uploaderLabel')" />

      <q-file
        v-model="files"
        outlined
        clearable
        :rules="[value => !!value || $t('baseCashToken.uploaderError')]"
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
          <div>{{ $t('baseCashToken.uploaderText') }}</div>
        </div>
      </q-file>

      <ActionBar />
    </q-form>

    <!-- dialogs -->
    <SubmissionDialog
      :state.sync="submissionState"
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

export default {
  name: 'BaseCashTokenCreateToken',
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
      tokenType: '',
      tokenTypeOptions: ['Base Cash'],
      underlying: '',
      tokenCode: '',
      currencyCode: '',
      amount: 0,

      issuerId: '',
      issuingAddress: '',

      files: null,

      submissionState: null,
    };
  },
  methods: {
    submit() {
      this.submissionState = 'submitting';

      this.$axios.post(URI.spTokenCreate, {
        tokenType: this.tokenType,
        underlying: this.underlying,
        tokenCode: this.tokenCode,
        currencyCode: this.currencyCode,
        amount: this.amount,

        issuerId: this.issuerId,
        issuingAddress: this.issuingAddress,
      })
        .then(() => {
          this.onSubmitSuccess();
        })
        .catch(() => {
          this.onSubmitFailure();
        });
    },
    onSubmitSuccess() {
      this.submissionState = 'success';
      this.resetForm();
    },
    onSubmitFailure() {
      this.submissionState = 'failure';
    },
    reset() {
      this.tokenName = '';
      this.description = '';
      this.investor = '';
      this.amount = '';

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
