<template>
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
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Apple" class="q-ml-md" style="height: 45px;">
         </div>
      </div>
   </div>

   <!-- Menu categories -->
   <div class="container">
      <div class="menu-categories q-py-xl">
         <h4 class="border-left text-bold text-grey-9">menu category</h4>

         <!-- Category Slider -->
         <div class="q-my-md">
            <swiper :slidesPerView="3.7" :spaceBetween="16" :freeMode="true" :modules="modules">
               <swiper-slide v-for="(cat) in categories" :key="cat.id">
                  <div class="row items-center category-slide q-pa-md q-my-md">
                     <q-img :src="cat.image.url" style="width: 80px;" />

                     <div class="q-ml-md">
                        <p class="text-body1 text-bold">{{ cat.name }}</p>
                        <q-badge color="red" class="text-bold" style="padding: 4px 8px; letter-spacing: 0.8px;">
                           Top Rated
                        </q-badge>

                     </div>
                  </div>
               </swiper-slide>
            </swiper>
         </div>

      </div>
   </div>

   <!-- Restaurant Foods -->
   <div class="container">
      <h4 class="border-left text-bold text-grey-9 q-mb-lg">Restaurant Foods</h4>

      <div class="row q-col-gutter-md">
         <div v-for="product in products" :key="product.id" class="col-md-3 q-mb-xl">
            <div class="product-card">
               <q-img :src="product.image.url" />

               <div class="cart-content q-pa-md">
                  <p class="text-body1 text-bold text-grey-9 q-mb-sm">
                     <span>{{ product.name }}</span>
                     <q-icon name="favorite" color="red" class="q-ml-sm" />
                  </p>

                  <q-badge color="info" text-color="white" label="Delivered 30pm" class="text-bold" style="padding: 4px 8px; letter-spacing: 0.8px;" />
                  <q-badge color="red-5" text-color="white" :label="getCurrency(product.price)" class="text-bold q-ml-sm" style="padding: 4px 8px; letter-spacing: 0.8px;" />

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
            <div class="col-6 q-my-lg">
               <h2 class="banner-title">
                  Are you <span class="text-bold">Looking</span> for <br>
                  a flexible <span class="text-bold">Part</span> <br>
                  <span class="text-bold">Time job?</span>
               </h2>

               <p class="q-my-lg text-subtitle1 text-bold text-grey-9">Then become a rider at Foodka</p>

               <q-btn unelevated color="red" label="Sign Up" class="rounded-borders" />
            </div>
            <div class="col-6">
               <q-img :src="require('assets/images/map-mobile.png')" />
            </div>
         </div>
      </div>
   </div>

   <!-- Categories batcg list -->
   <div class="container q-my-lg category-batch-list">
      <h4 class="border-left text-bold text-grey-9 q-mb-lg">Categories</h4>

      <div>
         <!-- <span v-for="cat in categories" :key="cat.id" color="red" :label="cat.name" class="q-px-lg q-py-md text-bold q-mr-sm"></span -->
         <span v-for="cat in categories" :key="cat.id" class="category-batch">{{cat.name}}</span>
      </div>
   </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { FreeMode } from "swiper"
import { mapState } from 'vuex'
import getCurrency from '../../mixins/getCurrency'
export default {
   mixins: [getCurrency],
   components: {
      Swiper, SwiperSlide
   },
   data() {
      return {
         modules: [FreeMode],
      }
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
      border: 1px solid $red-6;
      color: $red-6;
      border-radius: 50px;
      font-weight: bold;
      margin-right: 5px;
      letter-spacing: 0.5px;
   }
}
</style>
