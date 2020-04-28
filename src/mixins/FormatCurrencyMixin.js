const FormatCurrencyMixin = {
  methods: {
    /**
     * Formats amount based on currency and locale.
     * Used mainly by computed properties.
     * We purposely pass in locale and currency (even though they do not change
     * between computed properties) because we need them to be present inside computed
     * properties to ensure that their changes are listened to over in those places.
     * @param {String} locale - e.g. en-US
     * @param {String} currency - e.g. USD
     * @param {Number} amount - e.g. 10000
     * @returns {String} formattedAmound - e.g. $10,000.00
     */
    formatCurrency(locale, currency, amount) {
      return new Intl.NumberFormat(this.$i18n.locale, { style: 'currency', currency })
        .format(amount)
        .replace(/\D00(?=\D*$)/, ''); // for removing decimal places if they are all 0s. Credit: https://stackoverflow.com/a/49724581
    },
  },
}

export default FormatCurrencyMixin;
