<template>
   <div>
      <div class="row fullscreen">
         <div class="col-4">
            <div class="mt-5">
               <q-img :src="product.image.url"></q-img>

               <h4 class="">
                  <span>{{product.name}}</span>
                  <span>${{product.price}}</span>
               </h4>
               <p>{{ product.description }}</p>
            </div>
         </div>
         <div class="col-8 content-bg">
            <div class="mt-4">
               <h3>SELECT YOUR SIZE</h3>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
   name: "product-details",
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