<template>
   <q-btn flat unelevated rounded @click="openCartbar" icon="shopping_cart" color="white" text-color="primary">
      <q-badge color="primary" rounded floating>{{ totalCartItems }}</q-badge>
   </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   computed: {
      ...mapGetters('cart', ['totalCartItems'])
   },
   methods: {
      openCartbar() {
         this.emitter.emit("toggle-sidebar")
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
