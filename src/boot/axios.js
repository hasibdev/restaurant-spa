import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

axios.defaults.withCredentials = true

const api = axios.create({
   baseURL: process.env.API_URL || 'http://localhost:4000'
})

console.log(process.env.API_URL)

export default boot(({ app }) => {

   api.interceptors.request.use(async function (config) {
      // store.dispatch('validation/clearErrors')
      // Do something before request is sent
      const token = localStorage.getItem('token')
      config.headers.common.Authorization = `${token || ''}`

      return config
   }, function (error) {
      // Do something with request error
      console.log('Axios Request error: ', error)

      return Promise.reject(error)
   })

   //  api.interceptors.response.use(function (config) {
   //    return config
   //  }, async function (err) {
   //    if (err.response.status === 422) {
   //      store.dispatch("validation/setErrors", err.response.data.errors)
   //      Notify.create({
   //        type: 'negative',
   //        message: 'Form validation error!',
   //        position: 'top'
   //      })
   //    }
   //    return Promise.reject(err)
   //  })



   app.config.globalProperties.$axios = axios
   app.config.globalProperties.$api = api
})

export { api }
