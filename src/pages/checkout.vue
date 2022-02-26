<template>
   <q-page>
      <div class="flex full-vh">
         <!-- lEFT SIDE -->
         <div class="grow-1 bg-grey-2 q-pa-lg">
            <h4 class="text-grey">REVIEW ORDER</h4>

            <div v-for="item in cartItems" :key="item.id" class="row">
               <div class="col-4 q-pa-md">
                  <q-img :src="item.image.url" class="q-mt-lg"></q-img>
               </div>
               <div class="col-8 q-pl-md">
                  <h6>{{ item.name }}</h6>

                  <div class="row items-center">
                     <div class="col-4">
                        <ul class="q-pl-none text-grey-14">
                           <li class="flex justify-between q-mt-sm"><span>ONIONS</span>
                              <q-icon name="close" />
                           </li>
                           <li class="flex justify-between q-mt-sm"><span>TOMATOS</span>
                              <q-icon name="close" />
                           </li>
                           <li class="flex justify-between q-mt-sm"><span>TETTUCE</span>
                              <q-icon name="close" />
                           </li>
                        </ul>
                     </div>
                     <div class="col-4">
                        <h6 class="flex items-center justify-center">
                           QTY
                           <span class="flex column items-center q-ml-sm">
                              <q-icon @click="++form.quantity" name="keyboard_arrow_up" class="text-grey-14 pointer" />
                              <span class="text-primary">{{ form.quantity }}</span>
                              <q-icon @click="--form.quantity" name="keyboard_arrow_down" class="text-grey-14 pointer" />
                           </span>
                        </h6>
                     </div>
                     <div class="col-4">
                        <div class="flex items-center">
                           <h6>$6.50</h6>

                           <q-icon name="round_cancel" class="text-grey-6 pointer text-h5" />
                        </div>
                     </div>
                  </div>

               </div>
            </div>

         </div>
         <!-- RIGHT SIDE -->
         <div class="bg-white q-px-xl q-mt-xl right-content">
            <h4 class="text-grey">
               <q-icon name="arrow_back_ios" /> BACK TO MENU
            </h4>

            <ul class="q-pa-lg bg-grey-3 q-mt-md">
               <li class="flex justify-between q-mt-sm text-body1">
                  <span>SUB TOTAL</span>
                  <span class="text-bold">$17.00</span>
               </li>
               <li class="flex justify-between q-mt-sm text-body1">
                  <span>TAX [5%]</span>
                  <span class="text-bold">$2.36</span>
               </li>
               <li class="flex justify-between q-mt-sm text-body1">
                  <span>SERVICE CHARGE</span>
                  <span class="text-bold">$5.00</span>
               </li>
            </ul>

            <h5 class="flex justify-between q-mt-xl">
               <span class="text-grey-6">TOTAL</span>
               <span class="text-grey-8"> $24.36</span>
            </h5>

            <div class="text-center sidebar-bottom-content">
               <q-btn color="primary" class="full-width q-py-md text-body1">PAY</q-btn>
               <h6 class="q-mt-md text-grey q-my-md">ENTER COUPON</h6>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   data() {
      return {
         form: {
            quantity: 1
         }
      }
   },
   mounted() {
      this.emitter.emit("toggle-sidebar", false)
   },

   computed: {
      ...mapGetters('cart', ['cartItems'])
   },

}
</script>

<style lang="scss" scoped>
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
