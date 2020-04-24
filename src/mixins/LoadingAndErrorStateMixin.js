const LoadingAndErrorStateMixin = {
  data() {
    return {
      isLoading: false,
      hasError: false,
    };
  },
  props: {
    loadingDataPromise: {
      type: Promise,
      default: null,
    },
  },
  watch: {
    loadingDataPromise: {
      handler() {
        this.hasError = false;

        if (!this.loadingDataPromise) {
          return this.isLoading = false;
        }

        this.isLoading = true;

        this.loadingDataPromise
          .catch(() => {
            this.hasError = true;
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
      immediate: true,
    },
  },
}

export default LoadingAndErrorStateMixin;
