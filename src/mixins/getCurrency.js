import { mapState } from 'vuex'

export default {
   computed: {
      ...mapState('data', ['settings'])
   },
   methods: {
      getCurrency(value) {
         return `${this.settings.currencySymbol}${value}`
      }
   },
}
