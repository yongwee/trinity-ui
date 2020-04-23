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
          v-model="fxTokenValue"
          outlined
          :label="$t('fxTokenDataEntry.enterSpotPriceFxTokenInputLabel')"
          class="col-5"
          :options="fxTokenOptions"
          :rules="[val => !!val || $t('fxTokenDataEntry.enterSpotPriceFxTokenInputError')]"
          @input="onFormChange"
        />
        <q-input
          v-model="priceValue"
          outlined
          type="number"
          :label="$t('fxTokenDataEntry.enterSpotPricePriceInputLabel')"
          class="col-4"
          :rules="[val => !!val || $t('fxTokenDataEntry.enterSpotPricePriceInputError')]"
        />
      </div>
      <ActionBar />
    </q-form>
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';
import ActionBar from 'src/components/form/ActionBar';

export default {
  name: 'FXTokenDataEntryEnterSpotPrice',
  components: {
    PageLayout,
    ActionBar,
  },
  mixins: [DirtyStateMixin],
  data() {
    return {
      // TODO: fetch values for this
      fxTokenOptions: ['Token A', 'Token B'],

      priceValue: null,
      fxTokenValue: null,
    };
  },
  methods: {
    submit() {},
    reset() {
      this.priceValue = null;
      this.fxTokenValue = null;

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