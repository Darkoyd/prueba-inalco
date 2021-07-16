<template>
  <div>
    <b-row class="py-3 px-5">
      <h1>Prueba interna Nicolás Londoño</h1>
    </b-row>
    <b-breadcrumb :items="breadcrumbs">
      {{ $route }}
    </b-breadcrumb>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        { text: 'Query by client', href: '/client' },
        { text: 'Query by provider', href: '/provider' },
        { text: 'Query by product', href: '/product' },
        { text: 'General information', href: '/consulta' }
      ]
    }
  }
}
</script>

<style>

</style>
