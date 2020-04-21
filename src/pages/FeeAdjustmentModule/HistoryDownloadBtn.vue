<template>
  <q-btn
    flat
    color="secondary"
    class="q-mr-sm"
    :label="$t('feeHistory.download')"
    :loading="isLoading"
    @click="doDownload"
  />
</template>

<script>
import fileDownload from 'js-file-download';
import { URI } from 'src/config';

export default {
  name: 'FeeAdjustmentHistoryDownloadBtn',
  props: {
    brokerId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    /**
     * Triggers download of CSV based on brokerId
     */
    doDownload() {
      this.isLoading = true;

      this.$axios.get(URI.feeScheduleLatestDownload.replace('{brokerId}', this.brokerId))
        .then(({ data }) => {
          fileDownload(data, 'feehistory.csv');
        })
        .catch(() => {
          this.$q.dialog({
            title: this.$t('feeHistory.downloadErrorTitle'),
            message: this.$t('feeHistory.downloadErrorMessage'),
            focus: 'none',
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  }
}
</script>