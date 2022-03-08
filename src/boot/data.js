import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store }) => {
   await store.dispatch('data/fetchData')
   await store.dispatch('menu/fetchOffers')
   await store.dispatch('cart/retriveLocalCart')
})
