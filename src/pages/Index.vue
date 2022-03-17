<template>
   <q-header class="bg-white text-grey-10">
      <q-toolbar>
         <div class="container">
            <the-header />
         </div>
      </q-toolbar>
   </q-header>

   <!-- Hero Area -->
   <div class="hero-area q-px-xl">
      <div class="container">
         <h2 class="title ">
            <span class="b">Food</span> You Love,

            <br>

            Delivered <span class="b">To You.</span>
         </h2>

         <div class="q-mt-lg">
            <img src="https://lh3.googleusercontent.com/cjsqrWQKJQp9RFO7-hJ9AfpKzbUb_Y84vXfjlP0iRHBvladwAfXih984olktDhPnFqyZ0nu9A5jvFwOEQPXzv7hr3ce3QVsLN8kQ2Ao=s0" alt="Apple">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Apple" class="q-ml-sm-md" style="height: 45px;">
         </div>
      </div>
   </div>

   <!-- Menu categories -->
   <div class="container">
      <div class="menu-categories q-py-xl">
         <h4 class="border-left text-bold text-grey-9">menu category</h4>

         <!-- Category Slider -->
         <category-slider />

      </div>
   </div>

   <!-- Restaurant Foods -->
   <div class="container">
      <h4 class="border-left text-bold text-grey-9 q-mb-lg">Restaurant Foods</h4>

      <div class="row q-col-gutter-md">
         <div v-for="product in products" :key="product.id" @click="$router.push(`/products/${product.id}`)" class="col-md-3 col-sm-4 col-6 q-mb-xl cursor-pointer">
            <div class="product-card">
               <q-img :src="product.image.url" />

               <div class="cart-content q-pa-md">
                  <p class="text-body1 text-bold text-grey-9 q-mb-sm">
                     <span>{{ product.name }}</span>
                     <q-icon name="favorite" color="red" class="q-ml-sm" />
                  </p>

                  <q-badge color="info" text-color="white" label="Delivered 30pm" class="text-bold" style="padding: 4px 8px; letter-spacing: 0.8px;" />
                  <q-badge color="red-5" text-color="white" :label="getCurrency(product.price)" class="text-bold q-ml-md-sm" style="padding: 4px 8px; letter-spacing: 0.8px;" />

                  <p class="q-mt-sm text-body2 text-bold text-grey-8">Add to cart
                     <q-icon name="arrow_right" size="1.6rem" class="q-ml-sm" />
                  </p>
               </div>
            </div>
         </div>
      </div>
   </div>

   <!-- Banner Area -->
   <div class="banner-area" style="background-color: #f9f8fd;">
      <div class="container">
         <div class="row">
            <div class="col-md-6 col-12 q-my-lg q-py-md">
               <h2 class="banner-title">
                  Are you <span class="text-bold">Looking</span> for <br>
                  a flexible <span class="text-bold">Part</span> <br>
                  <span class="text-bold">Time job?</span>
               </h2>

               <p class="q-my-lg text-subtitle1 text-bold text-grey-9">Then become a rider at Foodka</p>

               <q-btn unelevated no-caps color="red-8" label="Sign Up" style="border-radius: 8px; letter-spacing: 0.5px;" />
            </div>
            <div class="col-md-6 col-12 order-mobile-first">
               <q-img :src="require('assets/images/map-mobile.png')" />
            </div>
         </div>
      </div>
   </div>

   <!-- Categories batcg list -->
   <div class="container q-my-xl q-py-md category-batch-list">
      <h4 class="border-left text-bold text-grey-9 q-mb-lg">Categories</h4>

      <div class="flex">
         <!-- <span v-for="cat in categories" :key="cat.id" color="red" :label="cat.name" class="q-px-lg q-py-md text-bold q-mr-sm"></span -->
         <span v-for="cat in categories" :key="cat.id" class="category-batch q-mt-sm">{{cat.name}}</span>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'
import getCurrency from '../mixins/getCurrency'
import CategorySlider from 'components/CategorySlider'
import TheHeader from 'components/TheHeader.vue'

export default {
   mixins: [getCurrency],
   components: {
      CategorySlider, TheHeader
   },
   computed: {
      ...mapState('data', ['categories', 'products'])
   },
}
</script>

<style lang="scss" scoped>
.border-left {
   position: relative;
   padding-left: 20px;
   &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-41%);
      width: 6px;
      height: 20px;
      background-color: $grey-4;
   }
}

.hero-area {
   background-image: url("assets/images/hermes-rivera.png");
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center center;
   background-color: #fff;

   height: 380px;
   display: flex;
   align-items: center;

   .title {
      color: #30314a;
      line-height: 70px;
      .b {
         font-weight: bold;
      }
      @media (max-width: 600px) {
         line-height: 40px;
      }
   }
}

.category-slide {
   box-shadow: 0px 8px 10px $grey-3;
}

.product-card {
   .cart-content {
      background-color: #fff;
      box-shadow: 0px 8px 10px $grey-3;
      margin-top: -10px;
      position: relative;
      border-radius: 10px 10px 0px 0px;
   }
}

.banner-area {
   .banner-title {
      color: #30314a;
      line-height: 70px;
   }
}

.category-batch-list {
   .category-batch {
      padding: 10px 20px;
      border: 1px solid $red-8;
      color: $red-8;
      border-radius: 50px;
      font-weight: bold;
      margin-right: 5px;
      letter-spacing: 0.5px;
   }
}
</style>
