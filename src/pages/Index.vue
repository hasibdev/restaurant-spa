<template>
   <q-page>

      <!-- Welcome Overlay -->
      <welcome-overlay />

      <div v-if="!showWelcome" class="row page-row">
         <!-- Left Content -->
         <div class="col-4 col-md-3 border-right">
            <p class="bg-grey-2 text-grey-14 q-pa-md" style="font-size: 18px;">Categories</p>
            <div class="scrollable-div custom-scrollbar q-px-sm px-md-md">
               <transition appear :enter-active-class="`animated fadeIn delay-${i+1}`" v-for="(cat, i) in categories" :key="cat.id">
                  <div @click="selectedCategory = cat" :class="{'active-category': selectedCategory.id === cat.id}" class="relative-position category-item q-mt-md text-center pointer">
                     <q-img :src="cat.image.url" spinner-color="white" style="max-height: 160px;"></q-img>
                     <p class="text-body1 xs-hide category-name ellipsis">{{ cat.name }}</p>
                     <p class="text-body1 sm-hide md-hide lg-hide xl-hide q-mt-sm ellipsis">{{ cat.name }}</p>
                  </div>
               </transition>
            </div>
         </div>
         <!-- Right Content -->
         <div class="col-8 col-md-9">
            <!-- Header -->
            <div class="bg-grey-2 text-grey-14 flex justify-between items-center right-content-header">
               <p style="font-size: 18px;">Products - <strong>{{ selectedCategory.name }}</strong></p>

               <q-btn-dropdown color="primary" label="Filter" dropdown-icon="las la-sliders-h">
                  <q-list>
                     <q-item clickable v-close-popup @click="filterProducts('lowest')">
                        <q-item-section>
                           <q-item-label>Lowest price</q-item-label>
                        </q-item-section>
                     </q-item>

                     <q-item clickable v-close-popup @click="filterProducts('highest')">
                        <q-item-section>
                           <q-item-label>Highest price</q-item-label>
                        </q-item-section>
                     </q-item>
                  </q-list>
               </q-btn-dropdown>
            </div>

            <!-- Main content -->
            <div class="q-px-md scrollable-div custom-scrollbar q-mt-sm">
               <div class="row q-col-gutter-md">
                  <transition appear :enter-active-class="`animated fadeIn delay-${i+1}`" v-for="(product, i) in displayProducts" :key="product.id">
                     <div @click="$router.push(`/products/${product.id}`)" class="col-6 col-sm-4 col-md-3 q-mt-sm text-center pointer">
                        <q-card class="product-card">
                           <q-img :src="product.image.url" spinner-color="white"></q-img>

                           <q-card-section class="q-pa-sm">
                              <p class="q-mt-sm text-grey-9 text-body1 text-bold text-italic ellipsis">{{ product.name }}</p>

                              <span class="price-fab">{{ getCurrency(product.price) }}</span>
                           </q-card-section>
                        </q-card>
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
import getCurrency from '../mixins/getCurrency'
export default defineComponent({
   name: 'PageIndex',
   mixins: [getCurrency],
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
      filterProducts(value) {
         if (value === 'lowest') {
            this.displayProducts.sort((a, b) => a.price - b.price)
         }
         if (value === 'highest') {
            this.displayProducts.sort((a, b) => b.price - a.price)
         }
      }
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
.page-row {
   height: 100vh;
   overflow: hidden;
}

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
   border-radius: 10px;
   overflow: hidden;
   box-shadow: 0px 10px 10px $grey-3;

   &.active-category {
      border-color: $primary;
   }
}

.price-fab {
   width: 50px;
   height: 50px;
   color: $primary;
   background-color: #fff;
   border-radius: 50%;
   position: absolute;
   right: -8px;
   top: -40px;
   z-index: 9;
   border: 1px solid $grey-4;
   display: flex;
   justify-content: center;
   align-items: center;
   font-weight: bold;
   box-shadow: 0px 10px 25px $grey-4;
}
.product-card {
   box-shadow: 0px 5px 15px $grey-3;
   border: 1px solid $grey-3;
}
</style>
