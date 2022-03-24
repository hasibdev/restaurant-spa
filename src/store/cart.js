
export default {
   namespaced: true,
   state: function () {
      return {
         cart: [],
         discountCoupon: null,
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
            return acc += parseFloat(getters.getTotalPerItem(item.uid))
         }, 0).toFixed(2)
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
            activeOffers.forEach(item => (item.type === 'DISCOUNT' ? (total += getters['getCartTotal'] * parseFloat(item.discountValue)) : 0))
         }
         if (state.discountCoupon) {
            total += getters['getCartTotal'] * parseFloat(state.discountCoupon.value)
         }
         return parseFloat(total).toFixed(2)
      },

      freeProducts: (state, getters, rootState, rootGetters) => {
         let activeOffers = rootGetters['menu/activeOffers']
         let free_products = []

         if (activeOffers && activeOffers.length > 0) {
            activeOffers.forEach(item => {
               if (item.type === 'FREE_PRODUCT') {
                  let free_product = rootGetters['data/products'].filter(product => product.id === item.freeProductId)
                  if (free_product && free_product.length > 0) {
                     free_products = [...free_products, ...free_product]
                  }
               }
            })
         }
         return free_products
      },

      tax: (state, getters, rootState, rootGetters) => {
         let percent = parseFloat(rootGetters['data/getTax'])
         percent = percent / 100
         return parseFloat(parseFloat(getters['getCartTotal']) * percent).toFixed(2)
      },

      // deliveryCost: state => (state.checkout && state.checkout.deliveryArea ? parseFloat(state.checkout.deliveryArea.deliveryCost) : 0),
      // Delivery cost is temp
      deliveryCost: state => 0,
      orderTotal: (state, getters) => (parseFloat(getters.getCartTotal) + parseFloat(getters.deliveryCost) + parseFloat(getters.tax) - parseFloat(getters.discountsTotal)).toFixed(2),
   },
   mutations: {
      SET_DATA(state, { property, data }) {
         state[property] = data
      },
      ADD_TO_CART(state, data) {
         state.cart.push({ ...data })
         localStorage.setItem('cart', JSON.stringify(state.cart))
      },
      UPDATE_QUANTITY(state, { mode, uid }) {
         const prevItem = state.cart.find(c => c.uid === uid)
         if (mode === 'add') {
            ++prevItem.quantity
         } else {
            --prevItem.quantity
         }
         localStorage.setItem('cart', JSON.stringify(state.cart))
      },
      REMOVE_CART_ITEM(state, uid) {
         state.cart = state.cart.filter(c => c.uid !== uid)
         localStorage.setItem('cart', JSON.stringify(state.cart))
      },

      CLEAR_CART(state) {
         state.cart = []
         localStorage.setItem('cart', JSON.stringify([]))
      }

   },
   actions: {
      retriveLocalCart({ commit }) {
         const data = JSON.parse(localStorage.getItem('cart'))
         if (data) {
            commit('SET_DATA', { property: 'cart', data })
         } else {
            commit('SET_DATA', { property: 'cart', data: [] })
         }
      }
   },
}
