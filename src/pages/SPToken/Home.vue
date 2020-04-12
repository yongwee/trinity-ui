<template>
  <div>
    <q-btn
      class="q-mb-md"
      color="primary"
      :label="$t('spToken.createToken')"
      @click="onCreateTokenClick"
    />

    <DataTable
      :data="data"
      :columns="columns"

      :search-value.sync="searchValue"
      :select-value.sync="tokenSelectValue"
      :select-options="tokenSelectOptions"

      :select-label="$t('spToken.selectLabel')"
    />
  </div>
</template>

<script>
import DataTable from 'src/components/DataTable';
import { routes } from 'src/config';

export default {
  name: 'SPTokenHome',
  components: {
    DataTable,
  },
  data() {
    return {
      // TODO: proper definition
      columns: [
        {
          name: 'tokenName',
          label: 'Token Name',
          field: 'tokenName',
          required: true,
          align: 'left',
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          require: true,
          align: 'left',
        },
        {
          name: 'investor',
          label: 'Investor',
          field: 'investor',
          require: true,
          align: 'left',
        },
        {
          name: 'amount',
          label: 'Amount',
          field: 'amount',
          require: true,
          align: 'left',
        },
      ],
      data: [],
      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: ['Token 1', 'Token 2'],
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
          tokenName: 'Token A',
          description: 'Token A description',
          investor: 'Xiaohuang',
          amount: '12341234'
        },
        {
          tokenName: 'Token B',
          description: 'Token B description',
          investor: 'Xiaoliu',
          amount: '45645632'
        },
      ]
    },
    onCreateTokenClick() {
      this.$router.push({ name: routes.spTokenCreateToken.name });
    },
    viewToken(type, id) {
      // TODO: open dialog to show token details
    }
  },
}
</script>

<style lang="scss" module>
</style>
