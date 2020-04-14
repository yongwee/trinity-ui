<template>
  <PageLayout>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      @change="onChange"
    >
      <q-input
        label="Token Name"
        outlined
      />
      <ActionBar />
    </q-form>
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import ActionBar from 'src/components/form/ActionBar';
import DirtyStateMixin from 'src/mixins/DirtyStateMixin';

export default {
  name: 'FXTokenOpenPositionCreateToken',
  components: {
    PageLayout,
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