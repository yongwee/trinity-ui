<template>
  <PageLayout title="Fee Adjustment">
    <div class="row q-gutter-md q-mb-lg">
      <q-select outlined v-model="client" :options="clientOptions" label="Client" class="col-6 q-mr-sm" />
      <q-select outlined v-model="market" :options="marketOptions" label="Market" class="col-6" />
    </div>
    <div class="q-mb-sm">Add fee schedule</div>
    <q-uploader
      flat
      bordered
      label="Import as CSV"
      :filter="checkFileType"
      :style="{ width: '100%', height: '200px'}"
      @added="addedFiles"
      @removed="removedFiles"
    >
      <template v-slot:list v-if="!hasFiles">
        <div class="column flex-center text-h6 text-grey-8 non-selectable full-height">
          <q-icon name="mdi-cloud-upload-outline" size="xl" />
          <div>Drag and drop CSV files here</div>
        </div>
      </template>
    </q-uploader>
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';

export default {
  name: 'FeeAdjustment',
  data() {
    return {
      clientOptions: [
        'Eastspring',
      ],
      marketOptions: [
        'ETD',
      ],
      client: null,
      market: null,
      hasFiles: false,
    }
  },
  methods: {
    checkFileType(files) {
      return files.filter(file => {
        const isCsv = file.type === 'text/csv';

        if (!isCsv) {

        }

        return isCsv;
      });
    },
    addedFiles() {
      this.hasFiles = true;
    },
    removedFiles() {
      this.hasFiles = false;
    },
  },
  components: {
    PageLayout,
  }
}
</script>

<style lang="scss" module>
.selectInput {
  width: 300px;
}
</style>
