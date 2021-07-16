<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-label-1"
        label="ID de cliente"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="clientId"
          required
          placeholder="ID de cliente"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">
        Consultar
      </b-button>
      <b-button type="reset" variant="danger">
        Borrar
      </b-button>
    </b-form>
    <b-table
      v-if="showTable"
      striped
      :items="clients"
      per-page="10"
    >
      <template #cell(id)="data">
        <b-btn
          :to="{ name: 'sale-id', params: {id: data.item.id}}"
        >
          {{ data.item.id }}
        </b-btn>
      </template>
      <template #cell(price)="data">
        {{ formatPrice(data.item.price) }}
      </template>
    </b-table>
  </b-container>
</template>

<script>
import numeral from 'numeral'
import DB from '../services/db'

export default {
  data () {
    return {
      clients: [],
      clientId: '',
      showTable: false
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      this.clients = await DB.querySalesByClient(this, this.clientId)
      this.showTable = true
    },
    onReset (event) {
      event.preventDefault()
      this.clientId = ''
    },
    formatPrice (num) {
      const number = numeral(num)
      return number.format('$0,0')
    }
  }
}
</script>

<style>

</style>
