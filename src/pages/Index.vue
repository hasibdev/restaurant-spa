<template>
   <q-page>
      <!-- Welcom Overlay -->
      <div v-if="showWelcome" class="welcom-screen">
         <div class="overlay"></div>
         <div class="content">
            <p @click="showWelcome = false" class="text-big q-mb-none">CLICK TO ORDER</p>
         </div>
      </div>

      <div class="row fullscreen">
         <!-- Left Content -->
         <div class="col-3">
            <div v-for="cat in categories" :key="cat.id" @click="selectedCategory = cat" class="q-pa-md text-center pointer">
               <q-img :src="cat.image.url" spinner-color="white"></q-img>
               <h4 class="q-mt-lg">{{ cat.name }}</h4>
            </div>
         </div>
         <!-- Right Content -->
         <div class="col-9 content-bg">
            <div class="q-pa-md">
               <h2 class="text-muted q-mb-xl">{{selectedCategory.name}}</h2>

               <div class="row q-gutter-md">
                  <div v-for="product in displayProducts" :key="product.id" @click="$router.push(`/products/${product.id}`)" class="col-md-4 col-sm-6 text-center pointer">
                     <q-img :src="product.image.url" spinner-color="white"></q-img>
                     <h4 class="q-mt-lg">{{ product.name }}</h4>
                     <h5 class="q-mt-md">${{ product.price }}</h5>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
export default defineComponent({
   name: 'PageIndex',
   data() {
      return {
         showWelcome: false,
         selectedCategory: {},
         displayProducts: []
      }
   },
   computed: {
      ...mapState('data', ['categories', 'products'])
   },
   created() {
      this.selectedCategory = this.categories[0]
   },
   watch: {
      selectedCategory: {
         immediate: true,
         handler: function (val) {
            this.displayProducts = this.products.filter(p => p.categoryId == val.id)
         }
      }
   },
})
</script>

<style lang="scss">
.welcom-screen {
   background-image: url("assets/images/welcome-bg.jpg");
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center center;
   background-color: var(--primary);
   position: fixed;
   height: 100vh;
   width: 100vw;
   display: flex;
   justify-content: center;
   align-items: center;
   .overlay {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
   }
   .content {
      position: relative;
      z-index: 9999;
      border: 4px solid #fff;
      border-radius: 5px;
      color: #fff;
      padding: 20px 50px;
      cursor: pointer;
      .text-big {
         font-size: 30px;
      }
   }
}
</style>