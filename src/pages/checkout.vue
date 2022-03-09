<template>
   <q-page>
      <div class="row wrapper">
         <!-- lEFT SIDE -->
         <div class="col-12 col-md-8 bg-grey-2 q-pa-lg">
            <div class="flex justify-between">
               <h4 class="text-grey">REVIEW ORDER</h4>

               <h4 class="text-grey d-md-none">
                  <router-link class="text-grey" to="/">
                     <q-icon name="arrow_back_ios" /> BACK TO MENU
                  </router-link>
               </h4>
            </div>

            <p v-if="!hasCartItem">No Cart Item found.</p>

            <div v-for="item in cartItems" :key="item.id" class="row">
               <div class="col-12 col-sm-4 q-pa-md">
                  <q-img :src="item.image.url" class="q-mt-lg"></q-img>
               </div>
               <div class="col-12 col-sm-8 q-pl-md">
                  <h6>{{ item.name }}</h6>

                  <div class="row items-center">
                     <div class="col-12 col-md-4 q-mb-md mb-md-none">
                        <p v-if="item.activeAdditions.length" class="q-mt-md text-bold q-mb-none">Additions</p>
                        <ul class="q-pl-none q-mt-sm text-grey-14">
                           <li v-for="addition in item.activeAdditions" :key="addition.id" class="flex justify-between q-mt-sm">
                              <span>{{ addition.name }}</span>
                              <!-- <q-icon name="close" /> -->
                           </li>
                        </ul>

                        <div v-for="option in item.activeOptions" :key="option.id">
                           <p class="q-mt-md text-bold q-mb-none">{{ option.name }}</p>
                           <ul class="q-pl-none q-mt-sm text-grey-14">
                              <li class="flex justify-between q-mt-sm">
                                 <span>{{ option.value.name }}</span>
                                 <!-- <q-icon name="close" /> -->
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div class="col-6 col-md-4">
                        <h6 class="flex items-center justiry-md-center">
                           QTY
                           <span class="flex column items-center q-ml-sm">
                              <q-icon @click="addQuantity(item.uid)" name="keyboard_arrow_up" class="text-grey-14 pointer" />
                              <span class="text-primary">{{ item.quantity }}</span>
                              <q-icon @click="removeQuantity(item.uid)" name="keyboard_arrow_down" class="text-grey-14 pointer" />
                           </span>
                        </h6>
                     </div>
                     <div class="col-6 col-md-4">
                        <div class="flex items-center justify-between">
                           <h6>{{ getCurrency(getTotalPerItem(item.uid)) }}</h6>

                           <div>
                              <q-icon @click="removeCartItem(item.uid)" name="cancel" class="text-grey-6 pointer text-h5" />
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>

         </div>
         <!-- RIGHT SIDE -->
         <div class="col-12 col-md-4 bg-white q-px-md px-xl-sm q-mt-xl right-content">
            <h4 class="text-grey d-none d-md-block">
               <router-link class="text-grey" to="/">
                  <q-icon name="arrow_back_ios" /> BACK TO MENU
               </router-link>
            </h4>

            <!-- Order Info -->
            <div>
               <h6 class="q-mt-md">Order Type</h6>
               <div>
                  <q-radio v-model="checkoutPrototype.orderType" val="DELIVERY" label="Delivery" />
                  <q-radio v-model="checkoutPrototype.orderType" val="PICKUP" label="Click & Collect" class="q-ml-md" />
               </div>

               <h6 class="q-mt-md">Basic informations</h6>
               <div>
                  <q-input stack-label outlined v-model="checkoutPrototype.name" label="Full Name" class="q-mt-sm" />
                  <q-select stack-label outlined v-model="checkoutPrototype.deliveryArea" :options="deliveryAreas" option-label="city" option-value="city" label="Delivery Area" class="q-mt-sm" />
                  <q-input stack-label outlined v-model="checkoutPrototype.name" label="Zip Code" class="q-mt-sm" />
                  <q-input stack-label outlined v-model="checkoutPrototype.name" label="Street and number" class="q-mt-sm" />
                  <q-input stack-label outlined v-model="checkoutPrototype.name" label="Phone" class="q-mt-sm" />
                  <q-input stack-label outlined v-model="checkoutPrototype.name" label="E-mail" type="email" class="q-mt-sm" />
               </div>
            </div>

            <p class="q-mt-md">*Your order will be ready in 35-45 minutes</p>

            <h6 class="q-mt-md">Payment</h6>
            <div>
               <q-radio v-model="checkoutPrototype.paymentMethod" val="CARD" label="Card" />
               <q-radio v-model="checkoutPrototype.paymentMethod" val="CASH" label="Cash" class="q-ml-md" />
            </div>

            <!-- Total, Tax, Discounts -->
            <ul class="q-pa-lg bg-grey-3 q-mt-md">
               <li class="flex justify-between q-mt-sm text-body1">
                  <span>SUB TOTAL</span>
                  <span class="text-bold">{{ getCurrency(getCartTotal) }}</span>
               </li>
               <li class="flex justify-between q-mt-sm text-body1">
                  <span>TAX [{{ settings.tax }}%]</span>
                  <span class="text-bold">{{ getCurrency(tax) }}</span>
               </li>
               <li class="flex justify-between q-mt-sm text-body1">
                  <span>DISCOUNTS TOTAL</span>
                  <span class="text-bold">{{ getCurrency(discountsTotal) }}</span>
               </li>
            </ul>

            <h5 class="flex justify-between q-mt-xl">
               <span class="text-grey-6">TOTAL</span>
               <strong class="text-grey-8">$24.36</strong>
            </h5>

            <!-- Empty space -->
            <div style="height: 140px;"></div>

            <div class="text-center sidebar-bottom-content">
               <q-btn color="primary" class="full-width q-py-md text-body1">PAY</q-btn>
               <input class="q-py-md full-width q-pa-md no-border" placeholder="ENTER COUPON" />
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import getCurrency from '../mixins/getCurrency'

export default {
   mixins: [getCurrency],
   data() {
      return {
         checkoutPrototype: {
            orderType: '',
            name: ''
         }
      }
   },
   computed: {
      ...mapGetters('cart', ['cartItems', 'hasCartItem', 'getTotalPerItem', 'getCartTotal', 'tax', 'discountsTotal']),
      ...mapState('data', ['settings']),
      ...mapGetters('data', ['deliveryAreas'])
   },
   mounted() {
      this.emitter.emit("toggle-sidebar", false)
      this.updateOffers()
   },
   methods: {
      ...mapActions('menu', ['updateOffers']),
      addQuantity(uid) {
         this.$store.commit('cart/UPDATE_QUANTITY', { mode: 'add', uid })
      },
      removeQuantity(uid) {
         this.$store.commit('cart/UPDATE_QUANTITY', { mode: 'remove', uid })
      },
      removeCartItem(uid) {
         this.$store.commit('cart/REMOVE_CART_ITEM', uid)
      }
   },


}
</script>

<style lang="scss" scoped>
.row.wrapper {
   min-height: 100vh;
}
.grow-1 {
   flex-grow: 1;
}

.right-content {
   position: relative;
   .sidebar-bottom-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
   }
}
</style>
