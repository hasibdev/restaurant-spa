<template>
   <q-page>
      <div class="row">
         <!-- Left content -->
         <div class="col-4">
            <div class="q-py-md q-px-xl scrollable-div overflow-hidden-x custom-scrollbar">
               <q-img :src="product.image.url" class="q-mt-lg"></q-img>

               <h5 class="flex justify-between q-mt-lg">
                  <span>{{product.name}}</span>
                  <span class="">${{product.price}}</span>
               </h5>
               <p class="q-mt-lg">{{ product.description }}</p>

               <div class="flex justify-between items-center q-mt-xl">
                  <h6 class="flex items-center">
                     QTY
                     <span class="flex column items-center q-ml-sm">
                        <q-icon @click="++form.quantity" name="keyboard_arrow_up" class="text-grey-14 pointer" />
                        <span class="text-primary">{{ form.quantity }}</span>
                        <q-icon @click="--form.quantity" name="keyboard_arrow_down" class="text-grey-14 pointer" />
                     </span>
                  </h6>
                  <h6>
                     <span class="text-grey-14 q-mr-md">TOTAL:</span> $6.50
                  </h6>
               </div>

               <div class="q-my-xl row justify-between q-col-gutter-md">
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
         <div class="col-8 content-bg q-pa-lg">
            <div class="scrollable-div custom-scrollbar">
               <!-- Additions -->
               <h4 class="q-mb-md">
                  <span class="line-right">Additions</span>
               </h4>
               <p v-if="!product.additions.length">No Additions avilable! </p>
               <carousel :items-to-show="3.5">
                  <slide v-for="addition in product.additions" :key="addition.id">
                     <p class="text-body1 pointer">{{ addition.name }}</p>
                  </slide>
               </carousel>

               <!-- Options -->
               <h4 class="q-mt-xl">Options</h4>
               <p v-if="!product.options.length">No Options avilable! </p>
               <div v-for="opt in product.options" :key="opt.id">
                  <h5 class="q-my-md ">
                     <span class="line-right">{{ opt.name }}</span>
                  </h5>

                  <carousel :items-to-show="3.5">
                     <slide v-for="item in opt.list" :key="item.id">
                        <p class="text-body1 pointer">{{ item.name }}</p>
                     </slide>
                  </carousel>

               </div>

            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, } from 'vue3-carousel'

export default {
   name: "product-details",
   components: {
      Carousel, Slide,
   },
   data() {
      return {
         form: {
            quantity: 1
         },
      }
   },
   computed: {
      ...mapState('data', ['products']),
      product() {
         return this.products.find(p => p.id == this.$route.params.id)
      }
   },
   methods: {
      ...mapMutations('cart', ['ADD_TO_CART']),
      addToCart() {
         this.ADD_TO_CART({})
      }
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
</style>
