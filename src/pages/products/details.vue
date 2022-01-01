<template>
   <div>
      <div class="row fullscreen">
         <!-- Left content -->
         <div class="col-4">
            <div class="q-pa-md q-mt-lg">
               <q-img :src="product.image.url"></q-img>

               <h4 class="flex justify-between q-mt-lg">
                  <span>{{product.name}}</span>
                  <span>${{product.price}}</span>
               </h4>
               <p>{{ product.description }}</p>
            </div>
         </div>
         <!-- Right content -->
         <div class="col-8 content-bg q-pa-md">
            <div v-for="opt in product.options" :key="opt.id">
               <h3 class="q-my-lg">{{ opt.name }}</h3>

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
   computed: {
      ...mapState('data', ['products']),
      product() {
         return this.products.find(p => p.id == this.$route.params.id)
      }
   },
}
</script>

<style lang="scss" scoped>
</style>