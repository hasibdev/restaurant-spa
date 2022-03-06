<template>
   <q-page-sticky v-if="totalCartItems" class="d-md-none" position="bottom-right" :offset="[20, 20]">
      <q-btn fab @click="openCartbar" icon="shopping_cart" color="primary">
         <q-badge color="red" floating>{{ totalCartItems }}</q-badge>
      </q-btn>
   </q-page-sticky>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   computed: {
      ...mapGetters('cart', ['totalCartItems'])
   },
   methods: {
      openCartbar() {
         this.emitter.emit("toggle-sidebar", true)
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
