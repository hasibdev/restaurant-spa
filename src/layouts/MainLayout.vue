<template>
   <q-layout view="hHh lpR fFr">

      <q-drawer v-model="rightDrawerOpen" side="right" bordered>
         <!-- drawer content -->
         <p>Left drawer</p>
      </q-drawer>

      <q-page-container>
         <router-view />
      </q-page-container>

   </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   data() {
      return {
         rightDrawerOpen: false
      }
   },
   computed: {
      ...mapGetters('cart', ['hasCartItem'])
   },

   watch: {
      hasCartItem: {
         handler: function (val) {
            this.rightDrawerOpen = val
            console.log('change', this.rightDrawerOpen)
         },
         immediate: true
      }
   },

}
</script>

<style lang="scss">
</style>

