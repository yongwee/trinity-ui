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
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="tokenName"
            :props="props"
          >
            {{ props.row.tokenName }}
          </q-td>
          <q-td
            key="description"
            :props="props"
          >
            {{ props.row.description }}
          </q-td>
          <q-td
            key="investor"
            :props="props"
          >
            {{ props.row.investor }}
          </q-td>
          <q-td
            key="amount"
            :props="props"
          >
            {{ props.row.amount }}
          </q-td>
          <q-td
            key="actions"
            :props="props"
          >
            <q-btn
              flat
              color="primary"
              label="View Token"
              @click="viewToken(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </DataTable>


    <!-- Dialogs -->
    <q-dialog v-model="viewTokenDialogOpen">
      <q-card
        v-if="viewTokenData"
        :class="$style.dialogContainer"
      >
        <q-card-section class="row items-center justify-between">
          <span class="text-h6">View {{ viewTokenData.tokenName }}</span>
          <q-btn
            v-close-popup
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>

        <q-list class="q-dialog__message">
          <q-item
            v-for="row in viewTokenRows"
            :key="row.field"
          >
            <q-item-section
              side
              :class="$style.dialogLabel"
            >
              {{ row.label }}
            </q-item-section>
            <q-item-section>{{ viewTokenData[row.field] }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
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
        {
          name: 'actions',
          label: 'Actions',
          align: 'right',
          headerStyle: 'padding-right: 32px',
        },
      ],
      data: [],
      searchValue: '',
      tokenSelectValue: '',
      tokenSelectOptions: ['Token 1', 'Token 2'],

      viewTokenDialogOpen: false,
      viewTokenData: null,
      viewTokenRows: [ // Field should match keys in token data
        {
          label: 'Token Name',
          field: 'tokenName',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Investor',
          field: 'investor',
        },
        {
          label: 'Amount',
          field: 'amount',
        },
      ]
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
    viewToken(tokenData) {
      this.viewTokenData = tokenData;
      this.viewTokenDialogOpen = true;
    }
  },
}
</script>

<style lang="scss" module>
.dialogContainer {
  min-width: 350px;
}

.dialogLabel {
  width: 120px;
}
</style>
