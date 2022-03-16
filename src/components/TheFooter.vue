<template>
   <div class="bg-grey-2 q-py-xl">
      <div class="container">
         <div class="row q-col-gutter-md">
            <!-- Column -->

            <div class="col-md-4">
               <q-avatar square>
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
               </q-avatar>

               <p class="q-mt-md text-body1 text-grey-10">Foodka Food Delivery Restaurant <br> Directory and online ordering script <br> template.</p>

               <h6 class="q-mb-md q-mt-xl">Our Socials</h6>

               <ul class="social-links">
                  <li>
                     <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="link">
                        <q-icon name="lab la-twitter" />
                     </a>
                  </li>
                  <li>
                     <a href="https://fb.com" target="_blank" rel="noopener noreferrer" class="link">
                        <q-icon name="lab la-facebook-f" />
                     </a>
                  </li>
                  <li>
                     <a href="https://yoiutube.com" target="_blank" rel="noopener noreferrer" class="link">
                        <q-icon name="lab la-youtube" />
                     </a>
                  </li>
                  <li>
                     <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="link">
                        <q-icon name="lab la-instagram" />
                     </a>
                  </li>
               </ul>
            </div>

            <!-- Column -->
            <div class="col-md-4 mt-mobile-xl">
               <q-icon name="where_to_vote" size="3rem" color="red-8" />
               <p class="text-body1 text-grey-10 q-mt-lg">315/8 Ulon road, Rampura, <br> Dhaka, Bangladesh</p>
            </div>

            <!-- Column -->
            <div class="col-md-4 mt-mobile-xl">
               <h5 class="text-grey-10 q-mb-md">Our Contact</h5>

               <p class="text-body2 text-bold q-mt-sm text-grey-10">
                  <q-icon name="las la-envelope" size="1.2rem" class="q-mr-sm " /> helloworld@gmail.com
               </p>
               <p class="text-body2 text-bold q-mt-sm text-grey-10">
                  <q-icon name="las la-phone" size="1.2rem" class="q-mr-sm" /> 002-99-88-541
               </p>

               <p class="text-body1 text-bold q-mt-lg text-grey-10">Get Menu
                  <q-icon name="expand_less" size="1.2rem" />
               </p>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.social-links {
   padding: 0;
   margin: 0;
   display: flex;

   .link {
      color: white;
      background-color: $red-7;
      border-radius: 8px;
      padding: 7px 10px;
      margin-right: 8px;
      font-size: 20px;
   }
}
</style>
