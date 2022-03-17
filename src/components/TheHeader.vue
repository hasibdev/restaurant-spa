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
         <ul class="menu-ul flex">
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
export default {
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
