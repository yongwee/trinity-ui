<template>
  <PageLayout
    :loading-data-promise="loadingDataPromise"
    :retry="boundFetchData"
  >
    <div class="row q-mb-lg">
      <q-card
        flat
        bordered
      >
        <q-card-section class="column flex-center text-h5">
          <Subtitle :label="$t('riskModule.totalPortfolioRiskThresholdLabel')" />

          <q-circular-progress
            v-model="totalPortfolioRiskThresholdValue"
            show-value
            :color="totalPortfolioRiskThresholdColor"
            track-color="grey-3"
            size="90px"
          >
            <span :class="`text-${totalPortfolioRiskThresholdColor}`">{{ totalPortfolioRiskThresholdValue }}%</span>
          </q-circular-progress>
        </q-card-section>
      </q-card>
    </div>

    <!-- breakdown section -->
    <q-card
      flat
      bordered
      class="row justify-evenly"
    >
      <DataSection
        :header="$t('riskModule.availableFiatCashLabel')"
        :label="formattedAvailableFiatCash"
      />

      <q-separator
        vertical
        :class="$style.separator"
      />

      <DataSection
        :header="$t('riskModule.navBaseCashTokensLabel')"
        :label="formattedNavBaseCashToken"
      />

      <q-separator
        vertical
        :class="$style.separator"
      />

      <DataSection
        :header="$t('riskModule.navSPTokensLabel')"
        :label="formattedNavSPToken"
      />
    </q-card>
  </PageLayout>
</template>

<script>
import FormatCurrencyMixin from 'src/mixins/FormatCurrencyMixin';
import PageLayout from 'src/components/PageLayout';
import Subtitle from 'src/components/form/Subtitle';
import DataSection from './DataSection';
import { URI } from 'src/config';

export default {
  name: 'RiskModuleHome',
  components: {
    PageLayout,
    Subtitle,
    DataSection,
  },
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      loadingDataPromise: null,

      // TODO: fetch these values from API
      totalPortfolioRiskThresholdValue: 13,

      availableFiatCashCurrency: 'USD',
      navBaseCashTokensCurrency: 'USD',
      navSPTokensCurrency: 'USD',

      availableFiatCash: 0,
      navBaseCashTokens: 0,
      navSPTokens: 0,
    };
  },
  computed: {
    totalPortfolioRiskThresholdColor() {
      return this.totalPortfolioRiskThresholdValue > 80
        ? 'negative'
        : this.totalPortfolioRiskThresholdValue > 50
        ? 'warning'
        : 'positive';
    },
    formattedAvailableFiatCash() {
      return this.formatCurrency(this.$i18n.locale, this.availableFiatCashCurrency, this.availableFiatCash);
    },
    formattedNavBaseCashToken() {
      return this.formatCurrency(this.$i18n.locale, this.navBaseCashTokensCurrency, this.navBaseCashTokens);
    },
    formattedNavSPToken() {
      return this.formatCurrency(this.$i18n.locale, this.navSPTokensCurrency, this.navSPTokens);
    },
  },
  created() {
    this.boundFetchData = () => {
      this.fetchData();
    };

    this.fetchData();
  },
  methods: {
    fetchData() {
      // this.loadingDataPromise = this.$axios.get(URI.riskManage);
      // --- TODO: START BLOCK: remove this block and uncomment the xhr above --
      this.loadingDataPromise = Promise.resolve({ data: {
        "allOpenSPTokenNAVAmount" : 11465812.980502945,
        "allBaseCashTokenNAVAmount" : 160274561.83070403,
        "availableFiatCashCurrency" : "USD",
        "allBaseCashTokenNAVCurrency" : "USD",
        "allOpenSPTokenNAVCurrency" : "USD",
        "calculationDate" : "2020-03-20T23:12:14Z",
        "availableFiatCashAmount" : 108008281.90461012
      }});
      // --- END BLOCK ---

      this.loadingDataPromise
        .then(({ data }) => {
          const {
            availableFiatCashAmount,
            availableFiatCashCurrency,

            allBaseCashTokenNAVAmount,
            allBaseCashTokenNAVCurrency,

            allOpenSPTokenNAVAmount,
            allOpenSPTokenNAVCurrency,
          } = data;

          this.availableFiatCashCurrency = availableFiatCashCurrency;
          this.navBaseCashTokensCurrency = allBaseCashTokenNAVCurrency;
          this.navSPTokensCurrency = allOpenSPTokenNAVCurrency;

          this.availableFiatCash = availableFiatCashAmount;
          this.navBaseCashTokens = allBaseCashTokenNAVAmount;
          this.navSPTokens = allOpenSPTokenNAVAmount;
        });
    },
  },
}
</script>

<style lang="scss" module>
.totalRiskDotIndicator {
  border-radius: 50%;
  border: 2px solid $positive;
  height: 20px;
  width: 20px;
}

.separator {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
