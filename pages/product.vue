<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-label-1"
        label="Product ID"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="productId"
          required
          placeholder="Product ID"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">
        Search
      </b-button>
      <b-button type="reset" variant="danger">
        Delete
      </b-button>
      <b-button @click="getAllProducts()">
        Get all products
      </b-button>
    </b-form>
    <b-table
      v-if="showTable"
      striped
      :items="products"
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
      <b-card-text> No data available for product ID: {{ productId }}</b-card-text>
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
      products: [],
      productId: '',
      showTable: false,
      empty: false
    }
  },
  computed: {
    rows () {
      return this.products.length
    }
  },
  methods: {
    async onSubmit (event) {
      this.empty = false
      event.preventDefault()
      this.showTable = true
      this.products = await DB.querySalesByProduct(this, this.productId)
      if (!this.products.length) {
        this.empty = true
      }
    },
    onReset (event) {
      event.preventDefault()
      this.productId = ''
    },
    formatPrice (num) {
      const number = numeral(num)
      return number.format('$0,0')
    },
    async getAllProducts () {
      this.showTable = true
      this.products = await DB.queryAllProducts(this)
    }
  }
}
</script>

<style>

</style>
