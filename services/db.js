
async function querySalesByClient (context, clientId) {
  const res = await context.$axios.get('/client/' + clientId)
  return res.data
}

async function querySalesByProvider (context, providerId) {
  const res = await context.$axios.get('/provider/' + providerId)
  return res.data
}

async function querySalesByProduct (context, productId) {
  const res = await context.$axios.get('/product/' + productId)
  return res.data
}

async function querySalesDetail (context, saleId) {
  const res = await context.$axios.get('/sale/' + saleId)
  return res.data
}

export default {
  querySalesByClient,
  querySalesByProvider,
  querySalesByProduct,
  querySalesDetail
}
