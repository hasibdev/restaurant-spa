<template>
   <q-page class="">
      <!-- Welcom Overlay -->
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated slideOutUp">
         <div v-if="showWelcome" class="welcom-screen z-max">
            <div class="overlay"></div>
            <div class="content">
               <p @click="showWelcome = false" class="text-big q-mb-none">CLICK TO ORDER</p>
            </div>
         </div>
      </transition>

      <div v-if="!showWelcome" class="row">
         <!-- Left Content -->
         <div class="col-3">
            <div class="scrollable-div custom-scrollbar">
               <transition appear :enter-active-class="`animated fadeIn delay-${i+1}s`" v-for="(cat, i) in categories" :key="cat.id">
                  <div @click="selectedCategory = cat" class="q-pa-lg q-mt-md text-center pointer">
                     <q-img :src="cat.image.url" spinner-color="white"></q-img>
                     <h4 class="q-mt-md">{{ cat.name }}</h4>
                  </div>
               </transition>
            </div>
         </div>
         <!-- Right Content -->
         <div class="col-9 content-bg">
            <div class="q-px-xl scrollable-div custom-scrollbar">
               <h2 class="text-muted q-mb-xl q-mt-md">{{selectedCategory.name}}</h2>

               <div class="row q-col-gutter-md">
                  <transition appear :enter-active-class="`animated fadeIn delay-${i+1}s`" v-for="(product, i) in displayProducts" :key="product.id">
                     <div @click="$router.push(`/products/${product.id}`)" class="col-6 col-sm-4 col-md-3 text-center pointer">
                        <q-img :src="product.image.url" spinner-color="white"></q-img>
                        <h4 class="q-mt-lg">{{ product.name }}</h4>
                        <h5 class="q-mt-md text-grey-14">${{ product.price }}</h5>
                     </div>
                  </transition>
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
         showWelcome: true,
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
   background-color: var(--q-primary);
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