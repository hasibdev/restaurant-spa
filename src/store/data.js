import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: function () {
      return {
         categories: null,
         products: null,
         settings: null,
         dataLoaded: false,
         showWelcome: true
      }
   },
   getters: {
      getProductById: state => id => state.products.find(p => p.id == id),
      getTax: state => state.settings.tax
   },
   mutations: {
      SET_DATA(state, { property, data }) {
         state[property] = data
      }
   },
   actions: {
      async fetchData({ commit }) {
         try {
            const resCategories = await api.get('/menu/categories')
            commit('SET_DATA', { property: 'categories', data: resCategories.data })

            const resProducts = await api.get('/menu/items')
            commit('SET_DATA', { property: 'products', data: resProducts.data })

            const resSettings = await api.get('/settings')
            commit('SET_DATA', { property: 'settings', data: resSettings.data })

            commit('SET_DATA', { property: 'dataLoaded', data: true })

            return Promise.resolve(true)
         } catch (error) {
            console.log(error)
            Promise.reject(false)
         }

      }
   },
}
