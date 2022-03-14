<template>
   <q-layout view="hHh lpR fFr">

      <q-header class="bg-white text-grey-10">
         <q-toolbar>
            <the-header />
         </q-toolbar>
      </q-header>

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
import TheHeader from 'components/TheHeader.vue'

export default {
   components: {
      CartSidebar, TheHeader
   },
   data() {
      return {
         rightDrawerOpen: false
      }
   },


   mounted() {
      // Register global event for toggle cart sidebar
      this.emitter.on("toggle-sidebar", isOpen => {
         if (isOpen === undefined) {
            this.rightDrawerOpen = !this.rightDrawerOpen
         } else {
            this.rightDrawerOpen = isOpen
         }
      })

      // Open sidebar on confition of screen and cart item
      // if (this.$q.screen.gt.sm && this.$store.state.cart.cart.length && this.$route.name !== 'checkout') {
      //    this.emitter.emit("toggle-sidebar", true)
      // }

   },
}
</script>

<style lang="scss" scoped>
.border-b {
   border-bottom: 2px solid $grey-3;
}
</style>

