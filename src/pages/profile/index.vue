<template>
   <q-page>
      <div class="q-px-md q-ml-md">
         <h4>Profile</h4>

         <div class="q-mt-lg">
            <!-- Name -->
            <label class="block">Full Name</label>
            <q-input dense v-model="profileForm.full_name" type="text" placeholder="Enter your Name" ref="fullname" :rules="[val => !!val || 'Name is required']" :error="Boolean(nameValidation)" :error-message="nameValidation" />

            <!-- Username -->
            <label class="block">Username</label>
            <q-input dense v-model="profileForm.username" type="text" placeholder="Username" ref="username" :rules="[val => !!val || 'Username is required']" :error="Boolean(usernameValidation)" :error-message="usernameValidation" />

            <!-- Phone -->
            <label class="block">Phone</label>
            <q-input dense v-model="profileForm.phone" type="text" placeholder="Phone" ref="phone" :rules="[val => !!val || 'Phone is required']" :error="Boolean(phoneValidation)" :error-message="phoneValidation" />

            <!-- Email -->
            <label class="block">Email</label>
            <q-input dense v-model="profileForm.email" type="text" placeholder="Enter your Email" ref="email" :rules="[val => !!val || 'Email is required']" :error="Boolean(emailValidation)" :error-message="emailValidation" />

            <!-- Country -->
            <label class="block">Country</label>
            <q-input dense v-model="profileForm.meta.country" type="text" placeholder="Enter your Country" ref="country" :rules="[val => !!val || 'Country is required']" />

            <!-- City -->
            <label class="block">City</label>
            <q-input dense v-model="profileForm.meta.city" type="text" placeholder="Enter your City" ref="city" :rules="[val => !!val || 'City is required']" />

            <!-- Zip -->
            <label class="block">Zip</label>
            <q-input dense v-model="profileForm.meta.zip" type="text" placeholder="Enter your Zip" ref="zip" :rules="[val => !!val || 'Zip is required']" />

            <!-- Street -->
            <label class="block">Street</label>
            <q-input dense v-model="profileForm.meta.street" type="text" placeholder="Enter your Street" ref="street" :rules="[val => !!val || 'Street is required']" />

            <q-btn color="primary" @click="updateProfile" class="q-px-xl q-mt-md">Update</q-btn>

         </div>
      </div>
   </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
         },
         validationError: null
      }
   },
   computed: {
      ...mapState('auth', ['user']),
      nameValidation() {
         return this.validationError && this.validationError.name
      },
      usernameValidation() {
         return this.validationError && this.validationError.username
      },
      emailValidation() {
         return this.validationError && this.validationError.email
      },
      phoneValidation() {
         return this.validationError && this.validationError.phone
      },
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

      const user = extend(true, {}, this.user)

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
   methods: {
      ...mapActions('auth', ['syncProfile']),
      async updateProfile() {
         this.validationError = null
         if (!this.validateProfile()) {
            return
         }

         try {
            this.$q.loading.show({ message: 'Please wait...' })

            const config = {
               headers: {
                  'X-User': this.$store.state.auth.user.id
               }
            }
            this.profileForm.name = this.profileForm.full_name

            const res = await this.$api.patch('/users', this.profileForm, config)


            this.$q.notify({
               message: 'Updated Successfully!',
               color: 'positive',
               position: 'top-right',
               icon: 'done',
            })
            this.syncProfile()
         } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
               this.validationError = {
                  ...error.response.data.payload.error
               }
            }
            this.$q.notify({
               message: 'Request Fail!',
               color: 'negative',
               position: 'top-right',
               icon: 'cancel',
            })
         } finally {
            this.$q.loading.hide()
         }
      },
      validateProfile() {
         this.$refs.fullname.validate()
         this.$refs.username.validate()
         this.$refs.phone.validate()
         this.$refs.email.validate()
         this.$refs.country.validate()
         this.$refs.city.validate()
         this.$refs.zip.validate()
         this.$refs.street.validate()

         return !(
            this.$refs.fullname.hasError ||
            this.$refs.username.hasError ||
            this.$refs.phone.hasError ||
            this.$refs.email.hasError ||
            this.$refs.country.hasError ||
            this.$refs.city.hasError ||
            this.$refs.zip.hasError ||
            this.$refs.street.hasError
         )
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
