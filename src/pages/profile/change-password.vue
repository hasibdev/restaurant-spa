<template>
   <div class="q-px-md q-pt-md rounded-borders q-pb-xl q-ml-md bg-grey-2">
      <h4 class="q-mb-md">Change Password</h4>

      <form>
         <!-- Password -->
         <label class="block">Old Password</label>
         <q-input dense v-model="form.password" type="password" placeholder="Enter Old Password" ref="password" :rules="[val => !!val || 'Password is required']" />

         <!-- Password -->
         <label class="block">Password</label>
         <q-input dense v-model="form.new_password" type="password" placeholder="Enter new Password" ref="newpassword" :rules="[val => !!val || 'Password is required', val => val.length > 7 || 'Password must be atleast 8 characters long.']" />

         <!-- Confirmed password -->
         <label class="block">Confirmed Password</label>
         <q-input dense v-model="confirmedPassword" type="password" placeholder="Confirmed Password" ref="confirmed-password" :rules="[val => !!val || 'Please confirm your Password', val => val === form.new_password || `Password dosen't match`]" />

         <q-btn label="Update" color="primary" @click="onUpdate" class="q-px-xl q-mt-lg q-py-xs" />
      </form>
   </div>
</template>

<script>
export default {
   data() {
      return {
         form: {
            user: null,
            password: '12345678',
            new_password: '123456789'
         },
         confirmedPassword: '123456789'
      }
   },
   methods: {
      async onUpdate() {
         // Validation
         if (!this.validateForm()) {
            return
         }

         try {
            const config = {
               headers: {
                  'X-User': this.$store.state.auth.user.id
               }
            }

            this.$q.loading.show({ message: 'Please wait...' })

            await this.$api.post('/change-password', this.form, config)
            console.log('Success')
            this.$q.notify({
               message: 'Updated Successfully!',
               color: 'positive',
               position: 'bottom',
               icon: 'done',
            })
         } catch (error) {
            console.log(error)
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
      validateForm() {
         this.$refs.password.validate()
         this.$refs.newpassword.validate()

         return !(
            this.$refs.password.hasError ||
            this.$refs.newpassword.hasError
         )
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
