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
         <div class="col-12 col-sm-8 q-pa-lg">
            <h5 class="q-mb-md">{{ product.name }} - Options</h5>

            <!-- Additions -->
            <div v-if="product.additions.length" class="addition-box">
               <p class="text-body1 text-grey-9 text-bold text-italic">Additions</p>

               <div class="row">
                  <div v-for="addition in product.additions" :key="addition.id" @click="updateActiveAddition(addition)" class="each-addition-item" :class="{active: additionActiveState(addition)}">
                     <p class="text-body1 text-bold text-grey-9">{{ addition.name }}</p>
                     <p class="text-body1 price">{{ getCurrency(addition.price.toFixed(1)) }}</p>
                  </div>
               </div>

            </div>

            <!-- Options -->
            <div>
               <div v-for="opt in product.options" :key="opt.id" class="addition-box q-mt-md">
                  <p class="text-body1 text-bold text-grey-9 text-italic">
                     {{ opt.name }}
                  </p>

                  <div class="row">
                     <div v-for="item in opt.list" :key="item.id" @click="updateActiveOption(opt, item)" class="pointer q-pa-md each-addition-item" :class="{active: optionActiveState(opt.id, item.id)}">
                        <!-- <q-img :src="product.image.url" class="q-mt-lg"></q-img> -->
                        <p class="text-body1">{{ item.name }}</p>
                        <p class="text-body1 price">{{ getCurrency(item.price.toFixed(1)) }}</p>
                     </div>
                  </div>

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
import CartFab from 'components/CartFab.vue'
import getCurrency from '../../mixins/getCurrency'
import { uid, extend } from 'quasar'

export default {
   name: "product-details",
   mixins: [getCurrency],
   components: {
      CartFab
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
         this.ADD_TO_CART({ ...extend(true, {}, this.product), uid: uid() })
         this.emitter.emit("toggle-sidebar", true)
      },
      setProductData() {

         // console.log(extend({}, this.getProductById(this.$route.params.id)))

         this.product = {
            // ...this.getProductById(this.$route.params.id),
            ...extend(true, {}, this.getProductById(this.$route.params.id)),
            quantity: 1,
            activeAdditions: [],
            activeOptions: []
         }

         if (this.product.options && this.product.options.length > 0) {
            this.product.options.forEach((o, index) => {
               this.product.activeOptions[index] = {
                  id: o.id,
                  name: o.name,
                  value: { ...o.list[0] }
               }
            })
         }
      },
      updateActiveOption(opt, item) {
         const prevOpt = this.product.activeOptions.find(o => o.id === opt.id)

         prevOpt.value = {
            ...item
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

.addition-box {
   padding: 20px 15px;
   border: 1px solid $grey-3;
   box-shadow: 0px 0px 10px $grey-3;
}

.each-addition-item {
   transition: all 0.15s ease-in-out;
   display: flex;
   align-items: center;
   cursor: pointer;
   margin: 10px 10px 0 0;
   padding: 10px;
   border: 1px solid $grey-3;
   box-shadow: 0px 0px 10px $grey-3;

   .price {
      width: 50px;
      height: 50px;
      border: 1px solid $positive;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
   }

   &.active {
      background: white;
      box-shadow: 0px 0px 10px $grey-4;
      border-color: $grey-4;
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
