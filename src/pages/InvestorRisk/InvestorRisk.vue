<template>
  <PageLayout :title="$t('investorRisk.title')">
    <DataTable
      :data="data"
      :columns="columns"

      :searchValue.sync="searchValue"
      :selectValue.sync="investorSelectValue"
      :selectOptions="investorSelectOptions"

      :selectLabel="$t('investorRisk.selectLabel')"
    />
  </PageLayout>
</template>

<script>
import PageLayout from 'src/components/PageLayout';
import DataTable from 'src/components/DataTable';

export default {
  name: 'InvestorRisk',
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
  },
  components: {
    PageLayout,
    DataTable,
  }
}
</script>