<template>
   <div>
      <q-dialog persistent v-model="openAuthModal">
         <q-card style="min-width: 350px">
            <q-card-section>
               <div class="text-h6">SignIn</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
               <p class="text-red" v-if="errorMessage">{{ errorMessage }}</p>
               <q-input dense v-model="signinForm.email" type="email" autofocus placeholder="Your Email" />
               <q-input dense v-model="signinForm.password" type="password" autofocus placeholder="Your Password" class="q-mt-sm" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
               <q-btn flat label="Cancel" @click="closeModal" />
               <q-btn flat label="Signin" @click="onSignin" />
            </q-card-actions>
         </q-card>
      </q-dialog>
   </div>
</template>

<script>
export default {
   data() {
      return {
         openAuthModal: false,
         errorMessage: '',
         signinForm: {
            email: '',
            password: '',
         }
      }
   },

   methods: {
      closeModal() {
         this.openAuthModal = false
      },
      async onSignin() {
         try {
            const res = await this.$api.post('/signin', this.signinForm)
            console.log(res)
         } catch (error) {
            console.log(error.response.status)
            if (error.response.status === 400) {
               this.errorMessage = 'Username or Password is wrong'
            }
         }
      }
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
