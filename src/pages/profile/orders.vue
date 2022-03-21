<template>
   <div>
      <h4>My orders</h4>
   </div>
</template>

<script>
export default {
   name: 'orders',
   data() {
      return {
         orders: []
      }
   },
   methods: {
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
