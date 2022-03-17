<template>
   <nav class="flex justify-between items-center full-width q-py-lg q-px-lg">
      <!-- Logo -->
      <div>
         <q-btn v-if="!$q.screen.gt.sm" dense flat round icon="menu" @click="toggleLeftDrawer" />

         <q-avatar square>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
         </q-avatar>
      </div>

      <!-- Menu -->
      <div v-if="$q.screen.gt.sm">
         <ul class="menu-ul flex items-center">
            <li>
               <router-link to="/" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-8 text-body2" style="font-size: 17px;">
                  Home
               </router-link>
            </li>
            <li>
               <router-link to="/shop" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-8 text-body2" style="font-size: 17px;">
                  Shop
               </router-link>
            </li>
            <li>
               <router-link to="/contact" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-8 text-body2" style="font-size: 17px;">
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
         <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
         </q-avatar>
      </div>
   </nav>
</template>

<script>
import CartFab from 'components/CartFab.vue'
export default {
   components: {
      CartFab,
   },
   methods: {
      toggleLeftDrawer() {
         this.emitter.emit('toggle-leftbar', true)
      }
   },
}
</script>

<style lang="scss">
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
