<template>
   <div class="q-px-md q-pt-md rounded-borders q-pb-xl q-ml-md bg-grey-2">
      <h4>My orders</h4>

      <div class="q-mt-lg">
         <q-table hide-pagination :rows="orders" :columns="columns" :pagination="pagination" />
      </div>

      <div class="row justify-center q-mt-md">
         <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="sm" />
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
         pagination: {
            sortBy: 'desc',
            descending: false,
            page: 1,
            rowsPerPage: 20
         },
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
      },
      pagesNumber() {
         return Math.ceil(this.orders.length / this.pagination.rowsPerPage)
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
