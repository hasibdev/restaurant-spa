<template>
   <div class="q-pa-md">
      <h6 class="text-center text-grey-14 q-mt-sm border-b q-pb-sm">MY CART ({{totalCartItems}})</h6>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   computed: {
      ...mapGetters('cart', ['totalCartItems'])
   },
}
</script>

<style lang="scss" scoped>
</style>
