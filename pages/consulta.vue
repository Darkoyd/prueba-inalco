<template>
  <b-container>
    <h3>Prueba interna de desarrollo de Nicolás Londoño</h3>
    <br>
    Use los links de arriba para consultar la información.
    Toda la información es generada aleatoriamente y no posee valor alguno.
    <br>
    <br>
    <br>
    <h4>Links de interés:</h4>
    <br>
    <a href="https://github.com/Darkoyd/prueba-interna-back">Repositorio backend*</a>
    <br>
    <br>
    <a href="https://github.com/Darkoyd/prueba-interna-front">Repositorio frontend</a>
    <br>
    <br>
    <a href="https://drive.google.com/file/d/1Z21j1f4gxmcYgYQGhZUczdtr0OKh-apU/view?usp=sharing">Documento de diseño</a>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h5>* Aunque en los documentos de diseño de la aplicación se especifica que no hay un backend y que es una aplicación serverless, por cuestiones de tiempo se implementó uno que solo responde a las solicitudes sin autenticación.</h5>
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
