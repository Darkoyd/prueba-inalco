<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-label-1"
        label="Provider ID"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="providerId"
          required
          placeholder="Provider ID"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">
        Search
      </b-button>
      <b-button type="reset" variant="danger">
        Delete
      </b-button>
      <b-button @click="getAllProviders()">
        Get all providers
      </b-button>
    </b-form>
    <b-table
      v-if="showTable"
      striped
      :items="providers"
      per-page="10"
      :current-page="currentPage"
    >
      <template #cell(id)="data">
        <b-link
          :to="{ name: 'sale-id', params: {id: data.item.id}}"
        >
          {{ data.item.id }}
        </b-link>
      </template>
      <template #cell(price)="data">
        {{ formatPrice(data.item.price) }}
      </template>
    </b-table>
    <b-pagination
      v-if="showTable"
      v-model="currentPage"
      :total-rows="rows"
      per-page="10"
    />
    <b-card v-if="empty">
      <b-card-text> No data available for provider ID: {{ providerId }}</b-card-text>
    </b-card>
  </b-container>
</template>

<script>
import numeral from 'numeral'
import DB from '../services/db'

export default {
  data () {
    return {
      currentPage: 1,
      providers: [],
      providerId: '',
      showTable: false,
      empty: false
    }
  },
  computed: {
    rows () {
      return this.providers.length
    }
  },
  methods: {
    async onSubmit (event) {
      this.empty = false
      event.preventDefault()
      this.showTable = true
      this.providers = await DB.querySalesByProvider(this, this.providerId)
      if (!this.providers.length) {
        this.empty = true
      }
    },
    onReset (event) {
      event.preventDefault()
      this.providerId = ''
    },
    formatPrice (num) {
      const number = numeral(num)
      return number.format('$0,0')
    },
    async getAllProviders () {
      this.showTable = true
      this.providers = await DB.queryAllProviders(this)
    }
  }
}
</script>

<style>

</style>
