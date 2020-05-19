<template>
  <PageLayout>
    <SectionHeader header="Structured Product Parameters" />
    <q-form
      ref="form"
      @submit="submit"
      @reset="reset"
      @change="onFormChange"
    >
      <InputLayout>
        <q-input
          v-model="tokenCode"
          outlined
          class="col-4"
          :label="$t('spToken.createTokenCodeInput')"
          :rules="[val => !!val || $t('spToken.createTokenCodeInputError')]"
        />
        <div class="break" />

        <q-input
          v-model="clientId"
          outlined
          class="col-4"
          :label="$t('spToken.createTokenClientIdInput')"
          :rules="[val => !!val || $t('spToken.createTokenClientIdInputError')]"
        />
        <div class="break" />

        <q-select
          v-model="productType"
          :options="productTypeOptions"
          outlined
          class="col-5"
          :label="$t('spToken.createTokenProductTypeInput')"
          :rules="[val => !!val || $t('spToken.createTokenProductTypeInputError')]"
        />
        <div class="break" />

        <q-input
          v-model="underlying"
          outlined
          class="col-4"
          :label="$t('spToken.createTokenUnderlyingInput')"
          :rules="[val => !!val || $t('spToken.createTokenUnderlyingInputError')]"
        />
        <div class="break" />

        <q-input
          v-model="notionalAmount"
          outlined
          type="number"
          step="0.01"
          class="col-4"
          :label="$t('spToken.createTokenNotionalAmountInput')"
          :rules="[val => !!val || $t('spToken.createTokenNotionalAmountInputError')]"
        />
        <q-input
          v-model="notionalAmountPerFixing"
          outlined
          type="number"
          step="0.01"
          class="col-5"
          :label="$t('spToken.createTokenNotionalAmountPerFixingInput')"
          :rules="[val => !!val || $t('spToken.createTokenNotionalAmountPerFixingInputError')]"
        />
        <div class="break" />

        <q-input
          v-model="indicativeSpotPrice"
          outlined
          type="number"
          step="0.00001"
          class="col-4"
          :label="$t('spToken.createTokenIndicativeSpotPriceInput')"
          :rules="[val => !!val || $t('spToken.createTokenIndicativeSpotPriceInputError')]"
        />
        <q-input
          v-model="strikeRate"
          outlined
          type="number"
          step="0.00001"
          class="col-3"
          :label="$t('spToken.createTokenStrikeRateInput')"
          :rules="[val => !!val || $t('spToken.createTokenStrikeRateInputError')]"
        />
        <q-input
          v-model="knockOutPrice"
          outlined
          type="number"
          step="0.00001"
          class="col-4"
          :label="$t('spToken.createTokenKnockOutPriceInput')"
          :rules="[val => !!val || $t('spToken.createTokenKnockOutPriceInputError')]"
        />
        <div class="break" />

        <q-input
          v-model="maturityDate"
          outlined
          class="col-4"
          :suffix="$t('spToken.createTokenMaturityDateInputSuffix')"
          type="number"
          :label="$t('spToken.createTokenMaturityDateInput')"
          :rules="[val => !!val || $t('spToken.createTokenMaturityDateInputError')]"
        />
        <div class="break" />

        <q-input
          v-model="fixingPage"
          outlined
          class="col-4"
          :label="$t('spToken.createTokenFixingPageInput')"
          :rules="[val => !!val || $t('spToken.createTokenFixingPageInputError')]"
        />
        <q-input
          v-model="noOfFixing"
          outlined
          type="number"
          class="col-3"
          :label="$t('spToken.createTokenNoOfFixingInput')"
          :rules="[val => !!val || $t('spToken.createTokenNoOfFixingInputError')]"
        />
        <div class="break" />

        <q-input
          v-model="counterpartyId"
          outlined
          class="col-5"
          :label="$t('spToken.createTokenCounterpartyIdInput')"
          :rules="[val => !!val || $t('spToken.createTokenCounterpartyIdInputError')]"
        />
        <div class="break" />

        <q-input
          v-model="opsId"
          outlined
          class="col-5"
          :label="$t('spToken.createTokenOpsIdInput')"
          :rules="[val => !!val || $t('spToken.createTokenOpsIdInputError')]"
        />
      </InputLayout>

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
import InputLayout from 'src/components/form/InputLayout';
import SectionHeader from 'src/components/form/SectionHeader';
import ActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI } from 'src/config';

export default {
  name: 'SPTokenCreateToken',
  components: {
    PageLayout,
    InputLayout,
    SectionHeader,
    ActionBar,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      tokenCode: null,
      clientId: null,
      productType: null,
      underlying: null,
      notionalAmountPerFixing: null,
      notionalAmount: null,
      indicativeSpotPrice: null,
      strikeRate: null,
      knockOutPrice: null,
      maturityDate: null,
      fixingPage: null,
      noOfFixing: null,
      counterpartyId: null,
      opsId: null,

      productTypeOptions: ['Non-boosted FX Accumulator'],

      submissionPromise: null,
    };
  },
  methods: {
    submit() {
      const postDataPromise = this.$axios.post(URI.spTokenIssue, {
        tokenCode: this.tokenCode,
        clientId: this.clientId,
        productType: this.productType,
        underlying: this.underlying,
        notionalAmount: this.notionalAmount,
        notionalAmountPerFixing: this.notionalAmountPerFixing,
        indicativeSpotPrice: this.indicativeSpotPrice,
        strikeRate: this.strikeRate,
        knockOutPrice: this.knockOutPrice,
        maturityDate: this.maturityDate,
        fixingPage: this.fixingPage,
        noOfFixing: this.noOfFixing,
        counterpartyId: this.counterpartyId,
        opsId: this.opsId,
      });

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
      this.tokenCode = null;
      this.clientId = null;
      this.productType = null;
      this.underlying = null;
      this.amount = null;
      this.notionalAmount = null;
      this.notionalAmountPerFixing = null;
      this.indicativeSpotPrice = null;
      this.strikeRate = null;
      this.knockOutPrice = null;
      this.maturityDate = null;
      this.fixingPage = null;
      this.noOfFixing = null;
      this.counterpartyId = null;
      this.opsId = null;

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
