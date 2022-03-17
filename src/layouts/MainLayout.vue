<template>
   <q-layout view="hHh lpR fFr">

      <!-- <q-header class="bg-white text-grey-10">
         <q-toolbar>
            <div class="container">
               <the-header />
            </div>
         </q-toolbar>
      </q-header> -->

      <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
         <!-- drawer content -->
         <p>Menu items</p>
      </q-drawer>

      <q-drawer v-model="rightDrawerOpen" class="custom-scrollbar" side="right" bordered>
         <cart-sidebar></cart-sidebar>
      </q-drawer>

      <q-page-container>
         <router-view />
      </q-page-container>

      <the-footer />

   </q-layout>
</template>

<script>
import CartSidebar from 'components/CartSidebar.vue'
// import TheHeader from 'components/TheHeader.vue'
import TheFooter from 'components/TheFooter.vue'

export default {
   components: {
      CartSidebar,
      TheFooter,
      // TheHeader,
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
</style>

