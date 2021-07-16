export default function (context) {
  const routeName = context.route.routeName
  const token = localStorage.getItem('token')
  if (!token) {
    if (routeName === 'consulta' || routeName === 'product' || routeName === 'client' || routeName === 'provider' || routeName === 'sale') { return context.redirect('/') }
  }
}
