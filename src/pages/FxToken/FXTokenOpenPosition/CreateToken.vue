<template>
  <div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      @change="onChange"
    >
      <SectionHeader :header="$t('fxTokenOpenPosition.createTokenSectionHeader')" />
      <q-input
        label="Token Name"
        outlined
      />
      <ActionBar />
    </q-form>
  </div>
</template>

<script>
import SectionHeader from 'src/components/form/SectionHeader';
import ActionBar from 'src/components/form/ActionBar';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';

export default {
  name: 'FXTokenOpenPositionCreateToken',
  components: {
    SectionHeader,
    ActionBar,
  },
  mixins: [DirtyStateMixin],
  methods: {
    onSubmit() {},
    onReset() {},
    onChange() {
      this.isDirty = true;
    },
  },
}
</script>

<style lang="scss" module>
</style>