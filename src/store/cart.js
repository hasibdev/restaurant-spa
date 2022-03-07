
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
      },
      getCartTotal(state, getters) {
         return state.cart.reduce((acc, item) => {
            return acc + getters.getTotalPerItem(item.uid)
         }, 0)
      },
      getTotalPerItem(state) {
         return uid => {

            const item = state.cart.find(c => c.uid === uid)

            const totalAddition = item.activeAdditions.reduce((acc, item) => {
               return acc + item.price
            }, 0)

            const totalOptions = item.activeOptions.reduce((acc, item) => {
               return acc + item.value.price
            }, 0)

            const total = (totalAddition + totalOptions + item.price) * item.quantity
            return total.toFixed(2)
         }
      },

      discountsTotal: (state, getters, rootState, rootGetters) => {
         let total = 0
         let activeOffers = rootGetters['menu/activeOffers']
         if (activeOffers && activeOffers.length > 0) {
            activeOffers.forEach(item => (item.type === 'DISCOUNT' ? (total += getters['productsTotal'] * parseFloat(item.discountValue)) : 0))
         }
         if (state.discountCoupon) {
            total += getters['productsTotal'] * parseFloat(state.discountCoupon.value)
         }
         return parseFloat(total).toFixed(2)
      },
   },
   mutations: {
      SET_DATA(state, { property, data }) {
         state[property] = data
      },
      ADD_TO_CART(state, data) {
         state.cart.push({ ...data })
      },
      UPDATE_QUANTITY(state, { mode, uid }) {
         const prevItem = state.cart.find(c => c.uid === uid)
         if (mode === 'add') {
            ++prevItem.quantity
         } else {
            --prevItem.quantity
         }
      },
      REMOVE_CART_ITEM(state, uid) {
         state.cart = state.cart.filter(c => c.uid !== uid)
      }
   },
   actions: {

   },
}
