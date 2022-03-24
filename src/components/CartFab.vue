<template>
   <!-- <q-btn flat unelevated rounded @click="openCartbar" :icon="cartSvg" color="white" text-color="grey-8">
      <q-badge v-if="totalCartItems > 0" color="primary" rounded floating>{{ totalCartItems }}</q-badge>
   </q-btn> -->
   <span class="cart-icon">
      <img :src="cartSvg" style="width: 18px;">
      <span class="cart-num">{{ totalCartItems }}</span>
   </span>
</template>

<script>
import { mapGetters } from 'vuex'
import cartSvg from 'assets/icons/cart-svgrepo-com.svg'
export default {
   data() {
      return {
         cartSvg
      }
   },
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
.cart-icon {
   width: 38px;
   height: 38px;
   border-radius: 50%;
   border: 1px solid $grey-10;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;

   .cart-num {
      position: absolute;
      /* padding: 3px; */
      background: #72b63b;
      color: #fff;
      top: -7px;
      right: 0px;
      width: 15px;
      height: 15px;
      font-size: 9px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
   }
}
</style>
