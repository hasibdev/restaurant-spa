import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: function () {
      return {
         categories: null,
         products: null,
         settings: null,
         dataLoaded: false,
         showWelcome: false,
      }
   },
   getters: {
      products: state => state.products,
      getProductById: state => id => state.products.find(p => p.id == id),
      getTax: state => state.settings.tax,
      deliveryAreas: state => state.settings.deliveryAreas,
      currency: state => state.settings.currency,
      freeProducts: (state, getters, rootState, rootGetters) => {
         let activeOffers = rootGetters['menu/activeOffers']
         let free_products = []
         console.log(activeOffers)

         if (activeOffers && activeOffers.length > 0) {
            activeOffers.forEach(item => {
               if (item.type === 'FREE_PRODUCT') {
                  let free_product = getters['products'].filter(product => product.id === item.freeProductId)
                  if (free_product && free_product.length > 0) {
                     free_products = [...free_products, ...free_product]
                  }
               }
            })
         }
         return free_products
      },
   },
   mutations: {
      SET_DATA(state, { property, data }) {
         state[property] = data
      }
   },
   actions: {
      async fetchData({ commit }) {
         try {
            const resSettings = await api.get('/settings')
            commit('SET_DATA', { property: 'settings', data: resSettings.data })

            const resCategories = await api.get('/menu/categories')
            commit('SET_DATA', { property: 'categories', data: resCategories.data })

            const resProducts = await api.get('/menu/items')
            commit('SET_DATA', { property: 'products', data: resProducts.data })


            commit('SET_DATA', { property: 'dataLoaded', data: true })

            return Promise.resolve(true)
         } catch (error) {
            console.log(error)
            Promise.reject(false)
         }

      }
   },
}
