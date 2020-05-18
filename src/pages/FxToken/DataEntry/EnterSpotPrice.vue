<template>
  <PageLayout>
    <q-form
      ref="form"
      @reset="reset"
      @submit="submit"
      @change="onFormChange"
    >
      <div class="row q-gutter-sm">
        <q-select
          v-model="fxToken"
          outlined
          :label="$t('fxTokenDataEntry.enterSpotPriceFxTokenInputLabel')"
          class="col-5"
          :options="fxTokenOptions"
          :rules="[val => !!val || $t('fxTokenDataEntry.enterSpotPriceFxTokenInputError')]"
          @input="onFormChange"
        />
        <q-select
          v-model="fxCurrency"
          outlined
          :label="$t('fxTokenDataEntry.enterSpotPriceFxCurrencyInputLabel')"
          class="col-5"
          :options="fxCurrencyOptions"
          :rules="[val => !!val || $t('fxTokenDataEntry.enterSpotPriceFxCurrencyInputError')]"
          @input="onFormChange"
        />
        <q-input
          v-model="price"
          outlined
          type="number"
          :label="$t('fxTokenDataEntry.enterSpotPricePriceInputLabel')"
          step="0.00001"
          class="col-4"
          :rules="[val => validatePrice(val) || $t('fxTokenDataEntry.enterSpotPricePriceInputError')]"
        />
      </div>
      <ActionBar />
    </q-form>

    <!-- Dialogs -->
    <SubmissionDialog :submission-promise="submissionPromise" />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import ActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import { URI } from 'src/config';
import currencyPairs from './currencyPairs';

const priceRgx = /^\d*(\.\d{0,5})?$/; // allow up to 5 decimal places

export default {
  name: 'FXTokenDataEntryEnterSpotPrice',
  components: {
    PageLayout,
    ActionBar,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      // TODO: fetch values for this
      fxTokenOptions: ['Token A', 'Token B'],

      price: null,
      fxToken: null,
      fxCurrency: null,
      fxCurrencyOptions: currencyPairs,

      submissionPromise: null,
    };
  },
  methods: {
    validatePrice(val) {
      return priceRgx.test(val);
    },
    submit() {
      // TODO: proper post
      // const postDataPromise = this.$axios.post(URI.fxTokenNavHistoryByTokenCode.replace('{tokenCode}', this.fxToken));
      const postDataPromise = Promise.resolve();

      this.submissionPromise = postDataPromise;

      postDataPromise
        .then(() => {
          this.resetForm();
        });
    },
    reset() {
      this.price = null;
      this.fxToken = null;
      this.fxCurrency = null;

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