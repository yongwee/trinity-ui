<template>
  <PageLayout>
    <q-form
      ref="form"
      @submit="submit"
      @reset="reset"
      @change="onFormChange"
    >
      <q-input
        v-model="tokenName"
        outlined
        class="q-mb-lg"
        :label="$t('spToken.createTokenNameInput')"
      />
      <q-input
        v-model="description"
        outlined
        class="q-mb-lg"
        :label="$t('spToken.createTokenDescriptionInput')"
      />
      <q-input
        v-model="investor"
        outlined
        class="q-mb-lg"
        :label="$t('spToken.createTokenInvestorInput')"
      />
      <q-input
        v-model="amount"
        outlined
        class="q-mb-lg"
        :label="$t('spToken.createTokenAmountInput')"
      />

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
import ActionBar from 'src/components/form/ActionBar';
import SubmissionDialog from 'src/components/SubmissionDialog';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import { URI } from 'src/config';

export default {
  name: 'SPTokenCreateToken',
  components: {
    PageLayout,
    ActionBar,
    SubmissionDialog,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      tokenName: '',
      description: '',
      investor: '',
      amount: '',

      submissionPromise: null,
    };
  },
  methods: {
    submit() {
      const postDataPromise = this.$axios.post(URI.spTokenCreate, {
        tokenName: this.tokenName,
        description: this.description,
        investor: this.investor,
        amount: this.amount,
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
