<template>
   <nav class="flex justify-between items-center full-width q-py-md q-px-lg">
      <!-- Logo -->
      <div>
         <q-avatar square>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
         </q-avatar>
      </div>

      <!-- Menu -->
      <div>
         <ul class="menu-ul flex">
            <li>
               <router-link to="/" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-9">Home</router-link>
            </li>
            <li>
               <router-link to="/about" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-9">About Us</router-link>
            </li>
            <li>
               <router-link to="/contact" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-9">Contact Us</router-link>
            </li>
            <li>
               <router-link to="/restaurants" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-9">Restaurants</router-link>
            </li>
            <li>
               <router-link to="/foods" class=" q-pa-sm q-mx-sm text-weight-medium text-grey-9">Foods</router-link>
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
