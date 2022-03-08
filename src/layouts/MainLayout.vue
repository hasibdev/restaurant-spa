<template>
   <q-layout view="hHh lpR fFr">

      <q-drawer v-model="rightDrawerOpen" class="custom-scrollbar" side="right" bordered>
         <cart-sidebar></cart-sidebar>
      </q-drawer>

      <q-page-container>
         <router-view />
      </q-page-container>

   </q-layout>
</template>

<script>
import CartSidebar from 'components/CartSidebar.vue'

export default {
   components: {
      CartSidebar,
   },
   data() {
      return {
         rightDrawerOpen: false
      }
   },


   mounted() {
      // Register global event for toggle cart sidebar
      this.emitter.on("toggle-sidebar", isOpen => {
         this.rightDrawerOpen = isOpen
      })

      // Open sidebar on confition of screen and cart item
      if (this.$q.screen.gt.sm && this.$store.state.cart.cart.length) {
         this.emitter.emit("toggle-sidebar", true)
      }

   },
}
</script>

<style lang="scss" scoped>
.border-b {
   border-bottom: 2px solid $grey-3;
}
</style>

