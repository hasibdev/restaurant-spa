import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: function () {
      return {
         cart: []
      }
   },
   getters: {
      hasCartItem(state) {
         return Boolean(state.cart.length)
      }
   },
   mutations: {
      SET_DATA(state, { property, data }) {
         state[property] = data
      },
      ADD_TO_CART(state, data) {
         state.cart.push(data)
      }
   },
   actions: {

   },
}
