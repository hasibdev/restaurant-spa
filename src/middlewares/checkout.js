
export default async function auth({ next, router, store }) {
   const hasCartItem = Boolean(store.state.cart.cart.length)

   if (!hasCartItem) {
      return router.push('/')
   }
   return next()
}
