<template>
   <q-page>

      <!-- Welcome Overlay -->
      <welcome-overlay />

      <div v-if="!showWelcome" class="row">
         <!-- Left Content -->
         <div class="col-4 col-md-3 border-right">
            <p class="bg-grey-2 text-grey-14 q-pa-md" style="font-size: 18px;">Categories</p>
            <div class="scrollable-div custom-scrollbar q-px-sm px-md-md">
               <transition appear :enter-active-class="`animated fadeIn delay-${i+1}`" v-for="(cat, i) in categories" :key="cat.id">
                  <div @click="selectedCategory = cat" :class="{'active-category': selectedCategory.id === cat.id}" class="relative-position category-item q-mt-md text-center pointer">
                     <q-img :src="cat.image.url" spinner-color="white" style="max-height: 160px;"></q-img>
                     <p class="text-body1 category-name">{{ cat.name }}</p>
                  </div>
               </transition>
            </div>
         </div>
         <!-- Right Content -->
         <div class="col-8 col-md-9">
            <!-- Header -->
            <div class="bg-grey-2 text-grey-14 flex justify-between items-center right-content-header">
               <p style="font-size: 18px;">Products - <strong>{{ selectedCategory.name }}</strong></p>

               <div>
                  <q-btn-dropdown color="primary" label="Filter" dropdown-icon="las la-sliders-h">
                     <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                           <q-item-section>
                              <q-item-label>Lowest price</q-item-label>
                           </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                           <q-item-section>
                              <q-item-label>Highest price</q-item-label>
                           </q-item-section>
                        </q-item>
                     </q-list>
                  </q-btn-dropdown>
               </div>
            </div>

            <!-- Main content -->
            <div class="q-px-md px-xl-md scrollable-div custom-scrollbar">
               <div class="row q-col-gutter-md">
                  <transition appear :enter-active-class="`animated fadeIn delay-${i+1}`" v-for="(product, i) in displayProducts" :key="product.id">
                     <div @click="$router.push(`/products/${product.id}`)" class="col-6 col-sm-4 col-md-3 q-mt-md text-center pointer">
                        <q-img :src="product.image.url" spinner-color="white"></q-img>
                        <h5 class="q-mt-sm">{{ product.name }}</h5>
                        <h6 class="q-mt-none text-grey-14">${{ product.price }}</h6>
                     </div>
                  </transition>
               </div>
            </div>
         </div>
      </div>

      <!-- Floating button -->
      <cart-fab />
   </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import CartFab from 'components/CartFab.vue'
import WelcomeOverlay from 'components/WelcomeOverlay.vue'
export default defineComponent({
   name: 'PageIndex',
   components: {
      CartFab, WelcomeOverlay
   },
   data() {
      return {
         selectedCategory: {},
         displayProducts: []
      }
   },
   computed: {
      ...mapState('data', ['categories', 'products', 'showWelcome'])
   },
   methods: {
      hideWelcome() {
         this.$store.commit('data/SET_DATA', { property: 'showWelcome', data: false })
      },
   },
   created() {
      this.selectedCategory = this.categories[0]
   },
   watch: {
      selectedCategory: {
         immediate: true,
         handler: function (val) {
            this.displayProducts = this.products.filter(p => p.categoryId == val.id)
         }
      }
   },
})
</script>

<style lang="scss" scoped>
.right-content-header {
   padding: 11px 25px;
}

.border-right {
   border-right: 1px solid $grey-4;
}

.category-name {
   position: absolute;
   top: 16px;
   left: 0px;
   color: white;
   padding: 5px 10px;
   border: 1px solid #fff;
   border-left: 0px;
   background-color: rgba(0, 0, 0, 0.548);
   border-radius: 0px 0px 15px 0px;
}

.category-item {
   border: 2px solid transparent;

   &.active-category {
      border-color: $primary;
   }
}
</style>
