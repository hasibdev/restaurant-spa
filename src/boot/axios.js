import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({
   baseURL: process.env.API_URL || 'http://localhost:4000'
})

console.log(process.env.API_URL)

export default boot(({ app }) => {
   app.config.globalProperties.$axios = axios
   app.config.globalProperties.$api = api
})

export { api }
