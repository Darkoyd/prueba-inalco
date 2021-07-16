<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-label-1"
        label="Client ID"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="clientId"
          required
          placeholder="Client ID"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">
        Search
      </b-button>
      <b-button type="reset" variant="danger">
        Delete
      </b-button>
      <b-btn @click="getAllClients()">
        Get all clients
      </b-btn>
    </b-form>
    <b-table
      v-if="showTable"
      striped
      :items="clients"
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
      <b-card-text> No data available for client ID: {{ clientId }}</b-card-text>
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
      clients: [],
      clientId: '',
      showTable: false,
      empty: false
    }
  },
  computed: {
    rows () {
      return this.clients.length
    }
  },
  methods: {
    async onSubmit (event) {
      this.empty = false
      event.preventDefault()
      this.clients = await DB.querySalesByClient(this, this.clientId)
      this.showTable = true
      if (!this.clients.length) {
        this.empty = true
      }
    },
    onReset (event) {
      event.preventDefault()
      this.clientId = ''
    },
    formatPrice (num) {
      const number = numeral(num)
      return number.format('$0,0')
    },
    async getAllClients () {
      this.showTable = true
      this.clients = await DB.queryAllClients(this)
    }
  }
}
</script>

<style>

</style>
