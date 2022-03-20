<template>
   <div class="container" style="min-height: 100vh">
      <div class="row">
         <div class="col-12 col-md-8 col-lg-6 q-mx-auto">
            <form class="contact-form" style="margin-top: 50px;">
               <h3 class="text-center">Let's get in touch</h3>
               <p class="text-center q-mt-lg text-body1 text-bold text-grey-9">Leave your details below and get a free trial or an tour</p>

               <div class="form-card q-mt-xl">
                  <p class="text-body1 text-bold text-grey-9">What option you're interested in?</p>

                  <div class="q-gutter-sm q-mb-lg q-mt-xs">
                     <q-radio v-model="shape" val="line" label="Line" />
                     <q-radio v-model="shape" val="rectangle" label="Rectangle" />
                     <q-radio v-model="shape" val="ellipse" label="Ellipse" />
                     <q-radio v-model="shape" val="polygon" label="Polygon" />
                  </div>

                  <p class="text-body1 text-bold q-mb-sm">Your details</p>

                  <div class="row q-col-gutter-md">
                     <div class="col-6">
                        <input type="text" placeholder="First Name*" class="form-control">
                     </div>
                     <div class="col-6">
                        <input type="text" placeholder="Last Name*" class="form-control">
                     </div>

                     <div class="col-6">
                        <input type="text" placeholder="Email*" class="form-control">
                     </div>
                     <div class="col-6">
                        <input type="text" placeholder="Company name*" class="form-control">
                     </div>

                     <div class="col-12">
                        <textarea rows="3" class="form-control"></textarea>
                     </div>
                  </div>

                  <p class="text-body2 text-grey-9 q-mt-lg" style="font-weight: 500;">By clicking the button below you are agree to our Terms of Service and have read <br> and understood our Privacy Policy.</p>

                  <q-btn color="primary" no-caps label="Submit" class="q-mt-lg q-px-xl q-py-sm" style="letter-spacing: 0.5px; font-size: 17px;" />

               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         shape: 'line'
      }
   },
}
</script>

<style lang="scss" scoped>
.contact-form {
   .form-control {
      border: 1px solid $grey;
      padding: 8px 12px;
      width: 100%;
      border-radius: 5px;
      &:focus {
         outline: none;
         border-color: $primary;
      }
   }
}

.form-card {
   padding: 20px;
   background: white;
   box-shadow: 0px 0px 20px $grey-4;
   border-radius: 4px;

   @media (min-width: 1024px) {
      padding: 35px;
   }
   @media (min-width: 1300px) {
      padding: 45px;
   }
}
</style>
