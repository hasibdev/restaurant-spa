<template>
   <q-layout view="hHh lpR fFr">

      <!-- Header -->
      <q-header class="bg-white text-grey-10 top-header">
         <q-toolbar>
            <div class="container">
               <the-header />
            </div>
         </q-toolbar>
      </q-header>

      <!-- Left side menu items -->
      <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
         <!-- drawer content -->
         <p>Menu items</p>
      </q-drawer>

      <!-- Right cart drawer -->
      <q-drawer v-model="rightDrawerOpen" class="custom-scrollbar" side="right" bordered>
         <cart-sidebar></cart-sidebar>
      </q-drawer>

      <!-- Page content / Router view -->
      <q-page-container>
         <router-view />
      </q-page-container>

      <!-- auth Modal -->
      <auth-modal></auth-modal>

      <!-- Footer -->
      <the-footer />

   </q-layout>
</template>

<script>
import CartSidebar from 'components/CartSidebar.vue'
import TheHeader from 'components/TheHeader.vue'
import TheFooter from 'components/TheFooter.vue'
import AuthModal from 'components/AuthModal.vue'

export default {
   components: {
      CartSidebar,
      TheFooter,
      TheHeader,
      AuthModal
   },
   data() {
      return {
         rightDrawerOpen: false,
         leftDrawerOpen: false
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

      this.emitter.on("toggle-leftbar", isOpen => {
         if (isOpen === undefined) {
            this.leftDrawerOpen = !this.leftDrawerOpen
         } else {
            this.leftDrawerOpen = isOpen
         }
      })
   },
}
</script>

<style lang="scss" scoped>
.border-b {
   border-bottom: 2px solid $grey-3;
}
.top-header {
   box-shadow: 0px 0px 10px $grey-3;
}
</style>

