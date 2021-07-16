<template>
  <b-container>
    <b-table
      :items="sale"
      striped
    >
      <template #cell(price)="data">
        {{ formatPrice(data.item.price) }}
      </template>
    </b-table>
  </b-container>
</template>

<script>
import numeral from 'numeral'
import DB from '../../services/db'

export default {
  data () {
    return {
      sale: []
    }
  },
  async mounted () {
    this.sale = await DB.querySalesDetail(this, this.$route.params.id)
  },
  methods: {
    formatPrice (num) {
      const number = numeral(num)
      return number.format('$0,0')
    }
  }
}
</script>

<style>

</style>
