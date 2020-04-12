<template>
  <div>
    <q-tabs v-model="tab" active-color="primary" indicator-color="primary" align="left">
      <q-tab :name="tabType.tx" :label="$t('fxTokenOpenPosition.txHistoryTab')" />
      <q-tab :name="tabType.nav" :label="$t('fxTokenOpenPosition.navHistoryTab')" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel :name="tabType.tx" class="q-px-none">
        <DataTable
          :data="data"
          :columns="columns"

          :searchValue.sync="searchValue"
          :selectValue.sync="tokenSelectValue"
          :selectOptions="tokenSelectOptions"
        />
      </q-tab-panel>
      <q-tab-panel :name="tabType.nav" class="q-px-none">
        <DataTable
          :data="data"
          :columns="columns"

          :searchValue.sync="searchValue"
          :selectValue.sync="tokenSelectValue"
          :selectOptions="tokenSelectOptions"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import DataTable from 'src/components/DataTable';

const tabType = {
  tx: 'tx',
  nav: 'nav',
};

export default {
  name: 'FXTokenOpenPositionHistory',
  data() {
    return {
      tabType,
      tab: tabType.tx,
      id: '',

      // TODO: proper definition
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          required: true,
          align: 'left',
        },
        {
          name: 'token',
          label: 'Token',
          field: 'token',
          require: true,
          align: 'left',
        },
      ],
      data: [],

      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: [ //TODO: proper definition
        '123',
        '456',
      ],
    };
  },
  watch: {
    tab() {
      const { id, type } = this.$route.query;

      if (id === this.id && type === this.tab) {
        return;
      }

      this.$router.replace({
        query: {
          type: this.tab,
          id: this.id,
        }
      });
    },
  },
  methods: {
    fetchData() {
      // TODO: proper fetch
      this.data = [
        {
          id: 1,
          token: 'Token A',
        },
        {
          id: 2,
          token: 'Token B',
        },
      ]
    },
  },
  created() {
    this.fetchData();

    const { id, type } = this.$route.query;

    this.tab = (type == tabType.nav)
      ? type
      : tabType.tx;

    this.id = id;
  },
  components: {
    DataTable,
  },
}
</script>

<style lang="scss" module>
</style>
