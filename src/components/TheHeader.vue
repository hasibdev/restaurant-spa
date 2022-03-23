<template>
   <nav :class="smallheader ? 'q-py-sm' : 'q-py-lg'" class="navbar">
      <!-- Logo -->
      <div>
         <q-btn v-if="!$q.screen.gt.sm" dense flat round icon="menu" @click="toggleLeftDrawer" />

         <router-link to="/">
            <q-avatar square>
               <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
            </q-avatar>
         </router-link>
      </div>

      <!-- Menu -->
      <div v-if="$q.screen.gt.sm">
         <ul class="menu-ul flex items-center">
            <li>
               <router-link to="/" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-8 text-body2" style="font-size: 16px;">
                  Home
               </router-link>
            </li>
            <li>
               <router-link to="/shop" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-8 text-body2" style="font-size: 16px;">
                  Shop
               </router-link>
            </li>
            <li>
               <router-link to="/contact" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-8 text-body2" style="font-size: 16px;">
                  Contact Us
               </router-link>
            </li>

            <li>
               <cart-fab></cart-fab>
            </li>

         </ul>
      </div>

      <!-- Righ Avatar -->
      <div>
         <cart-fab v-if="!$q.screen.gt.sm"></cart-fab>
         <q-avatar rounded @click="handleAuth" class="cursor-pointer q-ml-md">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
         </q-avatar>
      </div>
   </nav>
</template>

<script>
import CartFab from 'components/CartFab.vue'
import { mapMutations } from 'vuex'
export default {
   components: {
      CartFab,
   },
   data() {
      return {
         smallheader: false
      }
   },
   methods: {
      ...mapMutations('data', ['SET_AUTH_MODAL']),
      toggleLeftDrawer() {
         this.emitter.emit('toggle-leftbar', true)
      },
      checkSmallHeader(val) {
         if (val > 10) this.smallheader = true
         else this.smallheader = false
      },
      handleAuth() {
         const loggedIn = this.$store.state.auth.loggedIn
         if (loggedIn) {
            this.$router.push('/profile')
         } else {
            console.log('Open modal')
            this.emitter.emit('toggle-auth-modal')
         }
      }
   },

   mounted() {
      this.checkSmallHeader(window.scrollY)
      window.addEventListener('scroll', (e) => {
         this.checkSmallHeader(window.scrollY)
      })
   },

}
</script>

<style lang="scss">
// flex justify-between items-center full-width q-px-lg
.navbar {
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   padding-left: 24px;
   padding-right: 24px;
   transition: all 0.2s ease-in-out;
}
.menu-ul {
   > li > a {
      &:hover {
         color: $primary !important;
      }
   }

   .router-link-exact-active {
      color: $primary !important;
   }
}
</style>
