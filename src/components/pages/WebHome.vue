<template>
   <!-- Hero Area -->
   <div class="hero-area q-px-xl">
      <div>
         <h2 class="title ">
            <span class="b">Food</span> You Love,

            <br>

            Delivered <span class="b">To You.</span>
         </h2>

         <div class="q-mt-lg">
            <img src="https://lh3.googleusercontent.com/cjsqrWQKJQp9RFO7-hJ9AfpKzbUb_Y84vXfjlP0iRHBvladwAfXih984olktDhPnFqyZ0nu9A5jvFwOEQPXzv7hr3ce3QVsLN8kQ2Ao=s0" alt="Apple">
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Apple" style="height: 45px;">
         </div>
      </div>
   </div>

   <!-- Menu categories -->
   <div class="menu-categories q-px-xl q-py-xl">
      <h4 class="border-left text-bold text-grey-9">menu category</h4>

   </div>
</template>

<script>
export default {

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
