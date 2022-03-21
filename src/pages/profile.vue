<template>
   <q-page>
      <div class="container q-mb-xl">
         <div class="row q-mt-md">
            <div class="col-12 col-md-3">
               <q-list bordered separator>

                  <q-item clickable v-ripple exact to="/profile">
                     <q-item-section avatar>
                        <q-icon color="primary" name="person" />
                     </q-item-section>

                     <q-item-section>Profile</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple exact to="/profile/orders">
                     <q-item-section avatar>
                        <q-icon color="primary" name="shopping_cart_checkout" />
                     </q-item-section>

                     <q-item-section>My Orders</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple exact to="/profile/change-password">
                     <q-item-section avatar>
                        <q-icon color="primary" name="vpn_key" />
                     </q-item-section>

                     <q-item-section>Change Password</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple @click="onLogout">
                     <q-item-section avatar>
                        <q-icon color="primary" name="logout" />
                     </q-item-section>

                     <q-item-section>Logout</q-item-section>
                  </q-item>

               </q-list>
            </div>

            <!-- Router content -->
            <div class="col-12 col-md-9 q-mt-lg mt-md-none">
               <router-view></router-view>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
import { mapActions } from "vuex"

export default {
   name: 'ProfileRoot',
   methods: {
      ...mapActions('auth', ['logout']),
      onLogout() {
         this.logout()
         this.$router.push('/')
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
