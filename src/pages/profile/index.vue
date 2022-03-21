<template>
   <q-page>
      <div class="q-px-md q-ml-md">
         <h4>Profile</h4>

         <div class="q-mt-lg">
            <!-- Name -->
            <label class="block">Full Name</label>
            <q-input dense v-model="profileForm.full_name" type="text" placeholder="Enter your Name" ref="fullname" :rules="[val => !!val || 'Name is required']" />

            <!-- Username -->
            <label class="block">Username</label>
            <q-input dense v-model="profileForm.username" type="text" placeholder="Username" ref="username" :rules="[val => !!val || 'Username is required']" />

            <!-- Phone -->
            <label class="block">Phone</label>
            <q-input dense v-model="profileForm.phone" type="text" placeholder="Phone" ref="phone" :rules="[val => !!val || 'Phone is required']" />

            <!-- Email -->
            <label class="block">Email</label>
            <q-input dense v-model="profileForm.email" type="text" placeholder="Enter your Email" ref="email" :rules="[val => !!val || 'Email is required']" />

            <!-- Country -->
            <label class="block">Country</label>
            <q-input dense v-model="profileForm.meta.country" type="text" placeholder="Enter your Country" ref="country" :rules="[val => !!val || 'Country is required']" />

            <!-- City -->
            <label class="block">City</label>
            <q-input dense v-model="profileForm.meta.city" type="text" placeholder="Enter your City" ref="City" :rules="[val => !!val || 'City is required']" />

            <!-- Zip -->
            <label class="block">Zip</label>
            <q-input dense v-model="profileForm.meta.zip" type="text" placeholder="Enter your Zip" ref="Zip" :rules="[val => !!val || 'Zip is required']" />

            <!-- Street -->
            <label class="block">Street</label>
            <q-input dense v-model="profileForm.meta.street" type="text" placeholder="Enter your Street" ref="Street" :rules="[val => !!val || 'Street is required']" />

            <q-btn color="primary" class="q-px-lg">Update</q-btn>

         </div>
      </div>
   </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { extend } from 'quasar'
export default {
   name: 'Profile',
   data() {
      return {
         profileForm: {
            full_name: '',
            username: '',
            email: '',
            phone: '',
            meta: {
               country: '',
               city: '',
               zip: '',
               address: ''
            }
         }
      }
   },
   computed: {
      ...mapState('auth', ['user'])
   },
   created() {
      let roles = {
         'Super Admin': 0,
         Admin: 1,
         Owner: 2,
         Manager: 3,
         Seller: 4,
         Customer: 5
      }

      const user = extend({}, this.user)

      this.profileForm = {
         ...this.profileForm,
         ...user,
         name: user.full_name,
         role: roles[user.role]
      }

      if (!this.profileForm.meta) {
         this.profileForm.meta = {
            country: '',
            city: '',
            zip: '',
            address: ''
         }
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
