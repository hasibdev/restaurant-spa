<template>
   <!-- Welcom Overlay -->
   <transition appear enter-active-class="animated fadeIn" leave-active-class="animated slideOutUp">
      <div v-if="showWelcome" class="welcom-screen z-max">
         <div class="overlay"></div>
         <div class="content">
            <p @click="hideWelcome" class="text-big q-mb-none">CLICK TO ORDER</p>
         </div>
      </div>
   </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
   computed: {
      ...mapState('data', ['showWelcome'])
   },

   methods: {
      hideWelcome() {
         this.$store.commit('data/SET_DATA', { property: 'showWelcome', data: false })
      },
   },
}
</script>

<style lang="scss" scoped>
.welcom-screen {
   background-image: url("assets/images/welcome-bg.jpg");
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center center;
   background-color: #fff;
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
