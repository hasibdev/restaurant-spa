import moment from 'moment'
import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: function () {
      return {
         offers: []
      }
   },
   getters: {
      offers: state => state.offers,
      activeOffers: state => {
         return state.offers.filter(o => {
            let validConditions = o.conditions.filter(p => p.active == true)
            return o.conditions.length == validConditions.length
         })
      }
   },
   mutations: {
      SET_DATA(state, { property, data }) {
         state[property] = data
      },
      UPDATE_CONDITION_STATUS(state, payload) {
         let offer = state.offers.find(o => o.id == payload.offerId)
         let condition = offer.conditions.find(o => o.id == payload.conditionId)
         condition.active = payload.active
      }
   },
   actions: {
      /**
       * Gets menu offers from API
       */
      async fetchOffers({ commit }) {
         try {
            const res = await api.get('/menu/offers')
            commit('SET_DATA', { property: 'offers', data: res.data })
         } catch (error) {
            console.error('[API] Error while getting /menu/offers')
         }
      },

      /**
      * Updates offers states
      */
      updateOffers({ state, commit, rootGetters }) {
         console.log('Run')
         state.offers.forEach(offer => {
            offer.conditions.forEach(condition => {
               let ids = { offerId: offer.id, conditionId: condition.id }
               switch (condition.type) {
                  case 'DAY':
                     let today = moment().day()
                     commit('UPDATE_CONDITION_STATUS', { ...ids, active: condition.value.indexOf(today) !== -1 })
                     break
                  case 'MINIMUM_ORDER_VALUE':
                     commit('UPDATE_CONDITION_STATUS', { ...ids, active: rootGetters['cart/getCartTotal'] > condition.value })
                     break
                  case 'CATEGORY_ID':
                     let includes = false
                     rootGetters['cart/cartItems'].map(o => {
                        if (condition.value.indexOf(o.categoryId) !== -1) includes = true
                     })
                     commit('UPDATE_CONDITION_STATUS', { ...ids, active: includes })
                     break
               }
            })
         })
      }
   },
}
