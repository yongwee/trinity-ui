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
        <br>

        <q-input
          v-model="clientId"
          outlined
          class="col-4"
          :label="$t('spToken.createTokenClientIdInput')"
          :rules="[val => !!val || $t('spToken.createTokenClientIdInputError')]"
        />
        <br>

        <q-select
          v-model="productType"
          :options="productTypeOptions"
          outlined
          class="col-5"
          :label="$t('spToken.createTokenProductTypeInput')"
          :rules="[val => !!val || $t('spToken.createTokenProductTypeInputError')]"
        />
        <br>

        <q-input
          v-model="underlying"
          outlined
          class="col-4"
          :label="$t('spToken.createTokenUnderlyingInput')"
          :rules="[val => !!val || $t('spToken.createTokenUnderlyingInputError')]"
        />
        <q-input
          v-model="notionalAmountPerFixing"
          outlined
          type="number"
          class="col-5"
          :label="$t('spToken.createTokenNotionalAmountPerFixingInput')"
          :rules="[val => !!val || $t('spToken.createTokenNotionalAmountPerFixingInputError')]"
        />
        <br>

        <q-input
          v-model="indicativeSpotPrice"
          outlined
          type="number"
          class="col-4"
          :label="$t('spToken.createTokenIndicativeSpotPriceInput')"
          :rules="[val => !!val || $t('spToken.createTokenIndicativeSpotPriceInputError')]"
        />
        <q-input
          v-model="strikeRate"
          outlined
          type="number"
          class="col-3"
          :label="$t('spToken.createTokenStrikeRateInput')"
          :rules="[val => !!val || $t('spToken.createTokenStrikeRateInputError')]"
        />
        <q-input
          v-model="knockOutPrice"
          outlined
          type="number"
          class="col-4"
          :label="$t('spToken.createTokenKnockOutPriceInput')"
          :rules="[val => !!val || $t('spToken.createTokenKnockOutPriceInputError')]"
        />

        <q-input
          v-model="tenor"
          outlined
          class="col-3"
          :suffix="$t('spToken.createTokenTenorInputSuffix')"
          type="number"
          :label="$t('spToken.createTokenTenorInput')"
          :rules="[val => !!val || $t('spToken.createTokenTenorInputError')]"
        />
        <br>

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
        <br>

        <q-input
          v-model="counterpartyId"
          outlined
          class="col-5"
          :label="$t('spToken.createTokenCounterpartyIdInput')"
          :rules="[val => !!val || $t('spToken.createTokenCounterpartyIdInputError')]"
        />
        <br>

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
      indicativeSpotPrice: null,
      strikeRate: null,
      knockOutPrice: null,
      tenor: null,
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
        notionalAmountPerFixing: this.notionalAmountPerFixing,
        indicativeSpotPrice: this.indicativeSpotPrice,
        strikeRate: this.strikeRate,
        knockOutPrice: this.knockOutPrice,
        tenor: this.tenor,
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
      this.notionalAmountPerFixing = null;
      this.indicativeSpotPrice = null;
      this.strikeRate = null;
      this.knockOutPrice = null;
      this.tenor = null;
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
