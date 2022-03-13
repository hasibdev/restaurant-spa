<template>
   <div style="width: 100vw;">
      <swiper :slidesPerView="2">
         <swiper-slide>Slide 1</swiper-slide>
         <swiper-slide>Slide 2</swiper-slide>
         <swiper-slide>Slide 2</swiper-slide>
         <swiper-slide>Slide 2</swiper-slide>
         <swiper-slide>Slide 2</swiper-slide>

      </swiper>
   </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

export default {
   components: {
      Swiper, SwiperSlide,
   },
}
</script>

<style lang="scss" scoped>
</style>
