export default async function auth({ next, router }) {
   const localtoken = JSON.parse(localStorage.getItem('token'))
   if (!localtoken) {
      return router.push('/')
   }

   return next()
}
