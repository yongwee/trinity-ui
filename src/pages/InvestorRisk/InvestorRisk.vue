<template>
  <PageLayout>
    <DataTable
      :data="data"
      :columns="columns"

      :search-value.sync="searchValue"
      :select-value.sync="investorSelectValue"
      :select-options="investorSelectOptions"

      :select-label="$t('investorRisk.selectLabel')"

      bordered
    />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';

export default {
  name: 'InvestorRisk',
  components: {
    PageLayout,
    DataTable,
  },
  data() {
    return {
      // TODO: proper definition
      columns: [
        {
          name: 'investor',
          label: 'Investor',
          field: 'investor',
          require: true,
          align: 'left',
        },
        {
          name: 'navOfSPToken',
          label: 'NAV of SP Token',
          field: 'navOfSPToken',
          require: true,
          align: 'left',
        },
        {
          name: 'investedAmount',
          label: 'Invested Amount',
          field: 'investedAmount',
          require: true,
          align: 'left',
        },
        {
          name: 'baseCashTokenBalance',
          label: 'Base Cash Token Balance',
          field: 'baseCashTokenBalance',
          require: true,
          align: 'left',
        },
      ],
      data: [],
      searchValue: '',
      investorSelectValue: '',
      investorSelectOptions: ['Xiaoming', 'Xiaohua'],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // TODO: proper fetch
      this.data = [
        {
          investor: 'Investor A',
          navOfSPToken: 'asdf',
          investedAmount: '234',
          baseCashTokenBalance: 'asdfasdf',
        },
        {
          investor: 'Investor B',
          navOfSPToken: 'asdf',
          investedAmount: '234',
          baseCashTokenBalance: 'asdfasdf',
        },
      ];
    },
  }
}
</script>