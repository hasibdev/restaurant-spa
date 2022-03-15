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
         <div class="q-my-md" style="width: 100vw;">
            <swiper :slidesPerView="5.7" :spaceBetween="16" :freeMode="true" :modules="modules">
               <swiper-slide v-for="(cat) in categories" :key="cat.id">
                  <div class="flex">
                     <img :src="cat.image.url" style="max-width: 70px;" />
                     <div>
                        <p>{{ cat.name }}</p>
                        <p>{{ getCurrency(cat.price) }}</p>
                     </div>
                  </div>
               </swiper-slide>
            </swiper>
         </div>

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
      ...mapState('data', ['categories', 'products', 'showWelcome'])
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
</style>
