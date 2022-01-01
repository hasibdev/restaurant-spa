<template>
   <div>
      <div class="row fullscreen">
         <!-- Left content -->
         <div class="col-4">
            <div class="q-py-md q-px-xl q-mt-lg">
               <q-img :src="product.image.url"></q-img>

               <h4 class="flex justify-between q-mt-lg">
                  <span>{{product.name}}</span>
                  <span class="">${{product.price}}</span>
               </h4>
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

               <div class="q-mt-xl row justify-between q-col-gutter-md">
                  <div class="col-7">
                     <q-btn size="md" padding="10px" class="full-width q-mt-sm" unelevated color="primary">ADD TO CART</q-btn>
                  </div>
                  <div class="col-5">
                     <q-btn size="md" padding="10px" class="full-width q-mt-sm" unelevated color="grey-6">CANCLE</q-btn>
                  </div>

               </div>

            </div>
         </div>
         <!-- Right content -->
         <div class="col-8 content-bg q-pa-lg">
            <div v-for="opt in product.options" :key="opt.id">
               <h4 class="q-my-lg ">
                  <span class="line-right">{{ opt.name }}</span>
               </h4>

               <carousel :items-to-show="4">
                  <slide v-for="item in opt.list" :key="item.id">
                     <div>{{ item.name }}</div>
                  </slide>
               </carousel>

            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'
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