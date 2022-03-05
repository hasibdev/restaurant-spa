import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: function () {
      return {
         categories: null,
         products: null,
         dataLoaded: false,
         showWelcome: true
      }
   },
   getters: {
      getProductById: state => id => state.products.find(p => p.id == id)
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
            const resProducts = await api.get('/menu/items')

            commit('SET_DATA', { property: 'categories', data: resCategories.data })
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
