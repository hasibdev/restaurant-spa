<template>
   <div>
      <div class="row fullscreen">
         <!-- Left content -->
         <div class="col-4">
            <div class="q-pa-md">
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
               <h3>{{ opt.name }}</h3>

               <ul>
                  <li v-for="item in opt.list" :key="item.id">{{ item.name }}</li>
               </ul>
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