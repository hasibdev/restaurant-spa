import { boot } from 'quasar/wrappers'

import middlewarePipeline from '../middlewares/pipeline'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
   // something to do
   router.beforeEach((to, from, next) => {
      if (!to.meta.middleware) {
         return next()
      }
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

      const context = { to, from, next, router }

      return middleware[0]({
         ...context,
         next: middlewarePipeline(context, middleware, 1)
      })
   })
})
