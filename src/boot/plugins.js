import { boot } from 'quasar/wrappers'
import mitt from 'mitt'

export const emitter = mitt()
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
   // something to do
   app.config.globalProperties.emitter = emitter
})

