<template>
   <div class="q-px-md q-ml-md">
      <h4>My orders</h4>

      <div class="q-mt-lg">
         <q-table :rows="orders" :columns="columns" />
      </div>
   </div>
</template>

<script>
import getCurrency from "../../mixins/getCurrency"
import { date } from 'quasar'


export default {
   name: 'orders',
   mixins: [getCurrency],
   data() {
      return {
         orders: [],

      }
   },
   computed: {
      columns() {
         return [
            { label: "ID", field: 'id' },
            { label: "Total", field: row => this.getCurrency(row.content.total) },
            { label: "Date", field: row => date.formatDate(row.datetime, 'MMM Do YY') },
            { label: "Status", field: row => this.capitalize(row.content.status) },
         ]
      }
   },
   methods: {
      capitalize(val) {
         return val.charAt(0).toUpperCase() + val.slice(1)
      },
      async fetchOrders(page) {
         const config = {
            headers: {
               'X-User': this.$store.state.auth.user.id
            }
         }

         try {
            const res = await this.$api.get(`/checkout/user-orders/${page}`, config)
            this.orders = res.data.payload
         } catch (error) {
            console.log(error)
         }
      },
   },
   created() {
      this.fetchOrders(1)
   },

}
</script>

<style lang="scss" scoped>
</style>
