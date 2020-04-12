<template>
  <div>
    <div class="q-mb-md">
      <q-btn
        :label="$t('fxTokenOpenPosition.createToken')"
        color="primary"
        @click="onCreateTokenClick"
      />
    </div>

    <DataTable
      :columns="columns"
      :data="data"
      :searchLabel="$t('fxTokenOpenPosition.search')"
      :selectLabel="$t('fxTokenOpenPosition.tokenSelectLabel')"

      :searchValue.sync="searchValue"
      :selectValue.sync="tokenSelectValue"
      :selectOptions="tokenSelectOptions"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="token" :props="props">
            {{ props.row.token }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn flat color="primary" label="TX History" @click="goToHistory('tx', props.row.id)" />
            <q-btn flat color="primary" label="NAV History" @click="goToHistory('nav', props.row.id)" />
          </q-td>
        </q-tr>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'src/components/DataTable';
import { routes } from 'src/config';

export default {
  name: 'FXTokenOpenPositionHome',
  data() {
    return {
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
        {
          name: 'actions',
          label: 'Actions',
          align: 'right',
          headerStyle: 'padding-right: 32px',
        }
      ],
      data: [],
      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: ['asdf', 'zxcvzx'],
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
          id: 1,
          token: 'Token A',
        },
        {
          id: 2,
          token: 'Token B',
        },
      ]
    },
    onCreateTokenClick() {
      this.$router.push({ name: routes.fxTokenOpenPositionCreateToken.name });
    },
    goToHistory(type, id) {
      this.$router.push({ name: routes.fxTokenOpenPositionHistory.name, query: { type, id } });
    }
  },
  components: {
    DataTable,
  },
}
</script>

<style lang="scss" module>
</style>
