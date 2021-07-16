<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-label-1"
        label="ID de producto"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="productId"
          required
          placeholder="ID de producto"
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
      :items="products"
      per-page="10"
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
  </b-container>
</template>

<script>
import numeral from 'numeral'
import DB from '../services/db'

export default {
  data () {
    return {
      products: [],
      productId: '',
      showTable: false
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      this.showTable = true
      this.products = DB.querySalesByProduct(this, this.productId)
    },
    onReset (event) {
      event.preventDefault()
      this.productId = ''
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
