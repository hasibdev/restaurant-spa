<template>
   <q-page>
      <div class="q-px-md q-ml-md">
         <h4>Profile</h4>

         <div class="q-mt-lg">
            <!-- Name -->
            <label>Full Name</label>
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
            <label>Country</label>
            <q-input dense v-model="profileForm.meta.country" type="text" placeholder="Enter your Country" ref="country" :rules="[val => !!val || 'Country is required']" />

            <!-- City -->
            <label>City</label>
            <q-input dense v-model="profileForm.meta.city" type="text" placeholder="Enter your City" ref="City" :rules="[val => !!val || 'City is required']" />

            <!-- Zip -->
            <label>Zip</label>
            <q-input dense v-model="profileForm.meta.zip" type="text" placeholder="Enter your Zip" ref="Zip" :rules="[val => !!val || 'Zip is required']" />

            <!-- Street -->
            <label>Street</label>
            <q-input dense v-model="profileForm.meta.street" type="text" placeholder="Enter your Street" ref="Street" :rules="[val => !!val || 'Street is required']" />

         </div>
      </div>
   </q-page>
</template>

<script>
import { mapState } from 'vuex'
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
   mounted() {
      let roles = {
         'Super Admin': 0,
         Admin: 1,
         Owner: 2,
         Manager: 3,
         Seller: 4,
         Customer: 5
      }

      this.profileForm = {
         ...this.profileForm,
         ...this.user,
         name: this.user.full_name,
         role: roles[this.user.role]
      }
      this.profileForm = {
         ...this.profileForm,
         ...this.user,
         name: this.user.full_name,
         role: roles[this.user.role]
      }

      if (!this.profileForm.meta) {
         this.profileForm.meta = {
            country: '',
            city: '',
            zip: '',
            address: ''
         }
      }

      if (!this.profileForm.meta.address) {
         this.profileForm.meta.address = ''
      }

      if (!this.profileForm.meta.zip) {
         this.profileForm.meta.zip = ''
      }

      if (!this.profileForm.meta.city) {
         this.profileForm.meta.city = ''
      }

      if (!this.profileForm.meta.country) {
         this.profileForm.meta.country = ''
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
