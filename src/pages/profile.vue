<template>
   <q-page>
      <div class="container">
         <div class="row q-mt-md">
            <div class="col-lg-3 col-12">
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
                  <q-item clickable v-ripple>
                     <q-item-section avatar>
                        <q-icon color="primary" name="logout" />
                     </q-item-section>

                     <q-item-section>Logout</q-item-section>
                  </q-item>
               </q-list>
            </div>

            <!-- Router content -->
            <div class="col-lg-9 col-12">
               <router-view></router-view>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>
