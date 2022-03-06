<template>
   <q-page v-if="product">
      <div class="row min-vh">
         <!-- Left content -->
         <div class="col-12 col-sm-4">
            <div class="q-py-md q-px-md px-xl-md">
               <q-img :src="product.image.url" class="q-mt-lg"></q-img>

               <h5 class="flex justify-between q-mt-lg">
                  <span>{{product.name}}</span>
                  <span class="">{{ getCurrency(product.price) }}</span>
               </h5>
               <p class="q-mt-lg">{{ product.description }}</p>

               <div class="flex justify-between items-center q-mt-md mt-md-xl">
                  <h6 class="flex items-center">
                     QTY
                     <span class="flex column items-center q-ml-sm">
                        <q-icon @click="++product.quantity" name="keyboard_arrow_up" class="text-grey-14 pointer" />
                        <span class="text-primary">{{ product.quantity }}</span>
                        <q-icon @click="--product.quantity" name="keyboard_arrow_down" class="text-grey-14 pointer" />
                     </span>
                  </h6>
                  <h6>
                     <span class="text-grey-14 q-mr-md">TOTAL:</span> {{ getCurrency(getTotal) }}
                  </h6>
               </div>

               <div class="q-my-md my-md-xl row justify-between q-col-gutter-md">
                  <div class="col-7">
                     <q-btn @click="addToCart" size="md" padding="10px" class="full-width q-mt-sm" unelevated color="primary">ADD TO CART</q-btn>
                  </div>
                  <div class="col-5">
                     <q-btn to="/" size="md" padding="10px" class="full-width q-mt-sm" unelevated color="grey-6">CANCLE</q-btn>
                  </div>

               </div>

            </div>
         </div>
         <!-- Right content -->
         <div class="col-12 col-sm-8 content-bg q-pa-lg">
            <div class="">
               <!-- Additions -->
               <h5 class="q-mb-md">
                  <span class="line-right">Additions</span>
               </h5>
               <p v-if="!product.additions.length">No Additions avilable! </p>
               <carousel :items-to-show="4.5">
                  <slide v-for="addition in product.additions" :key="addition.id" class="q-pa-lg">
                     <div @click="updateActiveAddition(addition)" class="pointer q-pa-md each-addition-item" :class="{active: additionActiveState(addition)}">
                        <!-- <q-img :src="product.image.url" class="q-mt-lg"></q-img> -->
                        <p class="text-body1 pointer">{{ addition.name }}</p>
                        <p class="text-body1 text-bold text-grey-14">${{ addition.price }}</p>
                     </div>
                  </slide>
               </carousel>

               <!-- Options -->
               <div class="q-mt-xl"></div>
               <!-- <h4 class="q-mt-xl">Options</h4> -->
               <p v-if="!product.options.length">No Options avilable! </p>
               <div v-for="opt in product.options" :key="opt.id">
                  <h5 class="q-my-md ">
                     <span class="line-right">{{ opt.name }}</span>
                  </h5>

                  <carousel :items-to-show="4.5">
                     <slide v-for="item in opt.list" :key="item.id" class="q-pa-lg">
                        <div @click="updateActiveOption(opt, item)" class="pointer q-pa-md each-option-item" :class="{active: optionActiveState(opt.id, item.id)}">
                           <!-- <q-img :src="product.image.url" class="q-mt-lg"></q-img> -->
                           <p class="text-body1 pointer">{{ item.name }}</p>
                           <p class="text-body1 text-bold text-grey-14">{{ getCurrency(item.price) }}</p>
                        </div>
                     </slide>
                  </carousel>

               </div>

            </div>
         </div>
      </div>

      <!-- Floating button -->
      <cart-fab />
   </q-page>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, } from 'vue3-carousel'
import CartFab from 'components/CartFab.vue'
import getCurrency from '../../mixins/getCurrency'
import { uid } from 'quasar'

export default {
   name: "product-details",
   mixins: [getCurrency],
   components: {
      Carousel, Slide, CartFab
   },
   data() {
      return {
         product: null
      }
   },
   computed: {
      ...mapState('data', ['products']),
      ...mapGetters('data', ['getProductById']),
      additionActiveState() {
         return (addition) => {
            return this.product.activeAdditions.includes(addition)
         }
      },
      optionActiveState() {
         return (optId, itemId) => {
            const opt = this.product.activeOptions.find(o => o.id === optId)

            return opt.value.id === itemId
         }
      },
      totalAdditions() {
         return this.product.activeAdditions.reduce((acc, item) => {
            return acc + item.price
         }, 0)
      },
      totalOptions() {
         return this.product.activeOptions.reduce((acc, item) => {
            return acc + item.value.price
         }, 0)
      },
      getTotal() {
         return (this.product.price + this.totalAdditions + this.totalOptions) * this.product.quantity
      }
   },
   created() {
      this.setProductData()
   },
   methods: {
      ...mapMutations('cart', ['ADD_TO_CART']),
      addToCart() {
         this.ADD_TO_CART({ ...this.product, uid: uid() })
         this.emitter.emit("toggle-sidebar", true)
      },
      setProductData() {
         this.product = {
            ...this.getProductById(this.$route.params.id),
            quantity: 1,
            activeAdditions: [],
            activeOptions: []
         }

         if (this.product.options && this.product.options.length > 0) {
            this.product.options.map((o, index) => {
               this.product.activeOptions[index] = {
                  id: o.id,
                  name: o.name,
                  value: o.list[0]
               }
            })
         }
      },
      updateActiveOption(opt, item) {
         const prevOpt = this.product.activeOptions.find(o => o.id === opt.id)

         prevOpt.value = {
            id: item.id,
            name: item.name,
            price: item.price
         }
      },

      updateActiveAddition(addition) {
         const prevItem = this.product.activeAdditions.find(a => a.id === addition.id)

         if (prevItem) {
            this.product.activeAdditions = this.product.activeAdditions.filter(a => a.id != addition.id)
         } else {
            this.product.activeAdditions.push(addition)
         }
      },

   },
}
</script>

<style lang="scss" scoped>
.line-right {
   position: relative;
   &::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100vw;
      height: 1px;
      background: $grey-5;
      left: calc(100% + 35px);
   }
}

.each-addition-item {
   transition: all 0.15s ease-in-out;
   &.active {
      background: white;
      box-shadow: 0px 0px 20px #ddd;
   }
}
.each-option-item {
   transition: all 0.15s ease-in-out;
   &:hover,
   &.active {
      background: white;
      box-shadow: 0px 0px 20px #ddd;
   }
}
</style>
