import { api } from 'boot/axios'

export default {
   namespaced: true,
   state: function () {
      return {
         user: null,
         loggedIn: false,
      }
   },
   mutations: {
      SET_DATA(state, { property, data }) {
         state[property] = data
      },
   },

   actions: {
      async signin({ dispatch }, data) {
         try {
            const res = await api.post('/signin', data)

            dispatch('setStorage', res)
            dispatch('syncProfile')

            return Promise.resolve(res)
         } catch (error) {
            return Promise.reject(error)
         }
      },
      async signup({ dispatch }, data) {
         try {
            const res = await api.post('/signup', data)

            dispatch('setStorage', res)
            dispatch('syncProfile')

            return Promise.resolve(res)
         } catch (error) {
            return Promise.reject(error)
         }
      },
      setStorage({ }, res) {
         const token = res.data.payload.token
         const userId = res.data.payload.id

         localStorage.setItem('token', token)
         localStorage.setItem('userId', userId)
      },
      async syncProfile({ commit }) {
         try {
            const res = await api.get('/user')

            if (res.data.payload) {
               commit('SET_DATA', { property: 'user', data: res.data.payload })
               commit('SET_DATA', { property: 'loggedIn', data: true })
            }
         } catch (error) {
            console.log(error)
         }
      }
   }
}
