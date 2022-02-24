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
      },
      totalCartItems(state) {
         return state.cart.length
      },
      cartItems(state) {
         return state.cart
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
