import { useStore } from "vuex"

export default async function auth({ next, router }) {
   const store = useStore()

   console.log('test')
   console.log(store)

   // if (true) return router.push('/')

   return next()
}
