<template>
  <b-container>
    <h3>Prueba interna de desarrollo de Nicolás Londoño</h3>
    <br>
    Use los links de arriba para consultar la información.
    <br>
    <br>
    <br>
    <h4>Links de interes:</h4>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { name: 'Consulta por cliente', link: '/client' },
        { name: 'Consulta por producto', link: '/product' },
        { name: 'Consulta por proveedor', link: '/provider' }
      ]
    }
  }
}
</script>

<style>

</style>
