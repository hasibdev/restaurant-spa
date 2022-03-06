<template>
   <div class="q-pa-md">
      <h6 class="text-center text-grey-14 q-mt-sm border-b">MY CART ({{totalCartItems}})</h6>

      <div v-for="item in cartItems" :key="item.id" class="flex justify-between q-mt-lg">
         <div class="text-center" style="flex-grow: 1;">
            <q-img :src="item.image.url" spinner-color="white" style="max-height: 150px;"></q-img>
            <h6 class="q-mt-md">{{item.name}}</h6>
            <h6>{{ getCurrency(getTotalPerItem(item.uid)) }}</h6>
         </div>

         <div class="q-px-sm">
            <h6 class="">
               QTY
               <span class="flex column items-center q-ml-sm">
                  <q-icon @click="addQuantity(item.uid)" name="keyboard_arrow_up" class="text-grey-14 pointer" />
                  <span class="text-primary">{{ item.quantity }}</span>
                  <q-icon @click="removeQuantity(item.uid)" name="keyboard_arrow_down" class="text-grey-14 pointer" />
               </span>
            </h6>
         </div>
      </div>

      <!-- Empty Height -->
      <div style="height: 150px;"></div>

      <!-- Bottom -->
      <div class="fixed-bottom bg-white">
         <div class="flex justify-between q-pa-md top-shadow">
            <h6>Total</h6>
            <h6>{{ getCurrency(getCartTotal) }}</h6>
         </div>
         <h6 @click="$router.push('/checkout')" class="text-center text-white q-pa-md bg-primary pointer">
            CHECKOUT
         </h6>
      </div>

   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import getCurrency from '../mixins/getCurrency'
export default {
   mixins: [getCurrency],
   data() {
      return {

      }
   },
   computed: {
      ...mapGetters('cart', ['totalCartItems', 'cartItems', 'getTotalPerItem', 'getCartTotal']),
   },
   methods: {
      addQuantity(uid) {
         this.$store.commit('cart/UPDATE_QUANTITY', { mode: 'add', uid })
      },
      removeQuantity(uid) {
         this.$store.commit('cart/UPDATE_QUANTITY', { mode: 'remove', uid })
      }
   },
}
</script>

<style lang="scss" scoped>
.top-shadow {
   box-shadow: 0px -5px 8px #ddd;
}
</style>
