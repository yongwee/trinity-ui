<template>
  <div>
    <q-form @submit="submit" @reset="reset" @change="onFormChange" ref="form">
      <SectionHeader :header="$t('spToken.createTokenSectionheader')" />

      <q-input outlined class="q-mb-md" :label="$t('spToken.createTokenNameInput')" v-model="tokenName" />
      <q-input outlined class="q-mb-md" :label="$t('spToken.createTokenDescriptionInput')" v-model="description" />
      <q-input outlined class="q-mb-md" :label="$t('spToken.createTokenInvestorInput')" v-model="investor" />
      <q-input outlined class="q-mb-md" :label="$t('spToken.createTokenAmountInput')" v-model="amount" />

      <ActionBar />
    </q-form>

    <!-- dialogs -->
    <SubmissionDialog
      :state.sync="submissionState"
    />
  </div>
</template>

<script>
import SectionHeader from 'src/components/form/SectionHeader';
import ActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI } from 'src/config';

export default {
  name: 'SPTokenCreateToken',
  mixins: [DirtyStateMixin],
  data() {
    return {
      tokenName: '',
      description: '',
      investor: '',
      amount: '',

      submissionState: null,
    };
  },
  methods: {
    submit() {
      this.submissionState = 'submitting';

      this.$axios.post(URI.spTokenCreate, {
        tokenName: this.tokenName,
        description: this.description,
        investor: this.investor,
        amount: this.amount,
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
  },
  components: {
    SectionHeader,
    ActionBar,
    SubmissionDialog,
  }
}
</script>

<style lang="scss" module>
</style>
