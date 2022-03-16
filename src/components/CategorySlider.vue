<template>
   <div class="q-my-md">
      <swiper :slidesPerView="2.0" :spaceBetween="15" :freeMode="true" :modules="modules" :breakpoints="breakpoints">
         <swiper-slide v-for="(cat) in categories" :key="cat.id">
            <div class="row items-center category-slide q-pa-md q-my-md">
               <div class="col-5">
                  <q-img :src="cat.image.url" />
               </div>

               <div class="col-7">
                  <div class="q-ml-sm">
                     <p class="text-body1 text-bold ellipsis">{{ cat.name }}</p>
                     <q-badge color="red" class="text-bold" style="padding: 4px 8px; letter-spacing: 0.8px;">
                        Top Rated
                     </q-badge>
                  </div>

               </div>
            </div>
         </swiper-slide>
      </swiper>
   </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { FreeMode } from "swiper"

import { mapState } from 'vuex'
export default {
   components: {
      Swiper, SwiperSlide,
   },
   computed: {
      ...mapState('data', ['categories']),
      breakpoints() {
         return {
            '600': {
               slidesPerView: 2.5,
               spaceBetween: 15,
            },
            '768': {
               slidesPerView: 3,
               spaceBetween: 15,
            },
            '1024': {
               slidesPerView: 3.5,
               spaceBetween: 15,
            },
            '1300': {
               slidesPerView: 4.2,
               spaceBetween: 15,
            },
         }
      }
   },
   data() {
      return {
         modules: [FreeMode],
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
