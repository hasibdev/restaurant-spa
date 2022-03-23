<template>
   <div>
      <q-dialog v-model="openAuthModal">
         <!-- Signin -->
         <q-card v-if="mode === 'signin'" style="min-width: 390px">
            <q-card-section>
               <div class="text-h6">SignIn</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
               <p class="text-red" v-if="errorMessage">{{ errorMessage }}</p>

               <form @submit.prevent="onSignin">
                  <!-- User -->
                  <label class="block">Username or Email</label>
                  <q-input dense v-model="signinForm.user" type="text" autofocus placeholder="Enter your username or email" ref="user" :rules="[val => !!val || 'Username or Email is required']" />

                  <!-- Password -->
                  <label class="block">Password</label>
                  <q-input dense v-model="signinForm.password" type="password" placeholder="Enter your Password" ref="password" :rules="[val => !!val || 'Password is required']" />

                  <input type="submit" value="" class="hidden">
               </form>

               <p @click="mode = 'forget'" class="text-right q-mt-md text-teal cursor-pointer">Forget Password?</p>
               <p class="q-mt-md">Don't have any account? <span @click="mode = 'signup'" class="text-teal cursor-pointer">Register Here</span> </p>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
               <q-btn flat label="Cancel" color="grey" @click="closeModal" />
               <q-btn flat label="Signin" @click="onSignin" />
            </q-card-actions>
         </q-card>

         <!-- Signup -->
         <q-card v-if="mode === 'signup'" style="min-width: 390px">
            <q-card-section>
               <div class="text-h6">Signup</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
               <!-- Name -->
               <label>Full Name</label>
               <q-input dense v-model="signupForm.name" type="text" autofocus placeholder="Enter your Name" ref="fullname" :rules="[val => !!val || 'Name is required']" />

               <!-- Username -->
               <label class="block">Username</label>
               <q-input dense v-model="signupForm.username" type="text" placeholder="Username" ref="username" :rules="[val => !!val || 'Username is required']" />

               <!-- Phone -->
               <label class="block">Phone</label>
               <q-input dense v-model="signupForm.phone" type="text" placeholder="Phone" ref="phone" :rules="[val => !!val || 'Phone is required']" />

               <!-- Email -->
               <label class="block">Email</label>
               <q-input dense v-model="signupForm.email" type="text" placeholder="Enter your Email" ref="email" :rules="[val => !!val || 'Email is required']" />

               <!-- Password -->
               <label class="block">Password</label>
               <q-input dense v-model="signupForm.password" type="password" placeholder="Enter your Password" ref="password" :rules="[val => !!val || 'Password is required', val => val.length > 7 || 'Password must be atleast 8 characters long.']" />

               <!-- Confirmed password -->
               <label class="block">Confirmed Password</label>
               <q-input dense v-model="signupConfirmed" type="password" placeholder="Confirmed Password" ref="confirmed-password" :rules="[val => !!val || 'Please confirm your Password',, val => val === signupForm.password || `Password dosen't match`]" />

               <p class="q-mt-lg">Already have an account? <span @click="mode = 'signin'" class="text-teal cursor-pointer">Please Signin</span> </p>

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
               <q-btn flat label="Cancel" color="grey" @click="closeModal" />
               <q-btn flat label="Signup" @click="onSignup" />
            </q-card-actions>
         </q-card>

         <!-- Forget Password -->
         <q-card v-if="mode === 'forget'" style="min-width: 390px">
            <q-card-section>
               <div class="text-h6">Reset password</div>
            </q-card-section>

            <q-card-section>
               <form @submit.prevent="sendOtp">
                  <!-- Email -->
                  <label class="block">Email</label>
                  <q-input autofocus dense v-model="forgetForm.email" type="text" placeholder="Enter your Email" ref="email" :rules="[val => !!val || 'Email is required']" />

                  <q-btn no-caps @click="sendOtp" type="submit" color="primary" label="Send Mail" class="q-mt-lg" />
               </form>

               <p class="q-mt-lg">
                  Already have an account?
                  <span @click="mode = 'signin'" class="text-primary cursor-pointer">Please Signin</span>
                  or
                  <span @click="mode = 'signup'" class="text-primary cursor-pointer">Create new</span>
               </p>
            </q-card-section>
         </q-card>
         <!-- Reset Password -->
         <q-card v-if="mode === 'otp'" style="min-width: 390px">
            <q-card-section>
               <div class="text-h6">Reset password</div>
            </q-card-section>

            <q-card-section>
               <form @submit.prevent="submitOTP">
                  <!-- Otp -->
                  <label class="block">Otp</label>
                  <q-input dense v-model="resetForm.otp" type="text" placeholder="Enter Otp code" ref="otp" :rules="[val => !!val || 'Otp code is required']" />

                  <!-- Password -->
                  <label class="block">Password</label>
                  <q-input dense v-model="resetForm.new_password" type="password" placeholder="Enter your Password" ref="password" :rules="[val => !!val || 'Password is required', val => val.length > 7 || 'Password must be atleast 8 characters long.']" />

                  <!-- Confirmed password -->
                  <label class="block">Confirmed Password</label>
                  <q-input dense v-model="resetConfirmed" type="password" placeholder="Confirmed Password" ref="confirmed-password" :rules="[val => !!val || 'Please confirm your Password',, val => val === resetForm.new_password || `Password dosen't match`]" />

                  <q-btn no-caps @click="submitOTP" type="submit" color="primary" label="Submit" class="q-mt-lg" />
               </form>

               <p class="q-mt-lg">
                  Already have an account?
                  <span @click="mode = 'signin'" class="text-primary cursor-pointer">Please Signin</span>
                  or
                  <span @click="mode = 'signup'" class="text-primary cursor-pointer">Create new</span>
               </p>
            </q-card-section>
         </q-card>

      </q-dialog>
   </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
   data() {
      return {
         openAuthModal: false,
         mode: 'signin',
         errorMessage: '',
         signinForm: {
            user: '',
            password: ''
         },
         signupForm: {
            name: '',
            username: '',
            phone: '',
            address: {},
            email: '',
            password: ''
         },

         signupConfirmed: '',
         resetConfirmed: '',

         forgetForm: {
            email: ''
         },
         resetForm: {
            email: '',
            otp: '',
            new_password: ''
         },

      }
   },

   methods: {
      ...mapActions('auth', ['signin', 'signup']),
      closeModal() {
         this.openAuthModal = false
      },
      async onSignin() {
         this.errorMessage = ''

         if (!this.validateSignin()) {
            return
         }

         try {
            this.$q.loading.show({ message: 'Please wait...' })
            await this.signin(this.signinForm)

            this.$q.notify({
               message: 'Signin Successful!',
               color: 'positive',
               position: 'top-right',
               icon: 'done',
            })

            this.closeModal()
            this.resetAllForm()
         } catch (error) {
            this.$q.notify({
               message: 'Signin Fail!',
               color: 'negative',
               position: 'top-right',
               icon: 'cancel',
            })

            if (error.response.status === 400) {
               this.errorMessage = 'Username or Password is wrong'
            }
         } finally {
            this.$q.loading.hide()
         }
      },
      async onSignup() {
         if (!this.validateSignup()) {
            return
         }

         try {
            this.$q.loading.show({ message: 'Please wait...' })

            await this.signup(this.signupForm)

            this.$q.notify({
               message: 'Registration Successful!',
               color: 'positive',
               position: 'top-rightbottom',
               icon: 'done',
            })

            this.closeModal()
            this.resetAllForm()
         } catch (error) {
            console.log(error)
            this.$q.notify({
               message: 'Registration Fail!',
               color: 'negative',
               position: 'bottom',
               icon: 'cancel',
            })
         } finally {
            this.$q.loading.hide()
         }
      },
      async sendOtp() {
         this.$refs.email.validate()
         if (this.$refs.email.hasError) {
            return
         }

         try {
            this.$q.loading.show({ message: 'Please wait...' })

            await this.$api.post('/send-otp', this.forgetForm)
            this.mode = 'otp'

            this.$q.notify({
               message: 'Please check your mail',
               color: 'positive',
               position: 'bottom',
               icon: 'done',
            })

         } catch (error) {
            this.$q.notify({
               message: 'Request Fail!',
               color: 'negative',
               position: 'bottom',
               icon: 'cancel',
            })
         } finally {
            this.$q.loading.hide()
         }
      },
      async submitOTP() {
         if (!this.validateResetForm()) {
            return
         }
         try {
            this.$q.loading.show({ message: 'Please wait...' })

            await this.$api.post('/forgot-password', {
               ...this.resetForm,
               email: this.forgetForm.email
            })

            this.mode = 'signin'

            this.$q.notify({
               message: 'Request Success',
               color: 'positive',
               position: 'bottom',
               icon: 'done',
            })

         } catch (error) {
            this.$q.notify({
               message: 'Request Fail!',
               color: 'negative',
               position: 'bottom',
               icon: 'cancel',
            })
         } finally {
            this.$q.loading.hide()
         }
      },
      validateSignup() {
         this.$refs.fullname.validate()
         this.$refs.username.validate()
         this.$refs.phone.validate()
         this.$refs.email.validate()
         this.$refs.password.validate()
         this.$refs['confirmed-password'].validate()

         return !(
            this.$refs.fullname.hasError ||
            this.$refs.username.hasError ||
            this.$refs.phone.hasError ||
            this.$refs.email.hasError ||
            this.$refs.password.hasError ||
            this.$refs['confirmed-password'].hasError
         )
      },
      validateSignin() {
         this.$refs.user.validate()
         this.$refs.password.validate()

         return !(
            this.$refs.user.hasError ||
            this.$refs.password.hasError
         )
      },
      validateResetForm() {
         console.log('Validate')
         this.$refs.otp.validate()
         this.$refs.password.validate()
         this.$refs['confirmed-password'].validate()

         return !(
            this.$refs.otp.hasError ||
            this.$refs.password.hasError ||
            this.$refs['confirmed-password'].hasError
         )
      },
      resetAllForm() {
         this.signinForm = {
            user: '',
            password: ''
         }

         this.signupForm = {
            name: '',
            username: '',
            phone: '',
            address: {},
            email: '',
            password: ''
         }

         this.forgetForm = {
            email: ''
         }

         this.resetForm = {
            email: '',
            otp: '',
            new_password: ''
         }
      },

   },

   mounted() {
      // Register global event for toggle Auth Modal
      this.emitter.on("toggle-auth-modal", isOpen => {
         if (isOpen === undefined) {
            this.openAuthModal = !this.openAuthModal
         } else {
            this.openAuthModal = isOpen
         }
      })

   },
}
</script>

<style lang="scss" scoped>
</style>
