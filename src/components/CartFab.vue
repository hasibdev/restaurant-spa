<template>
   <q-page-sticky class="d-sm-none" position="bottom-right" :offset="[18, 18]">
      <q-btn fab @click="openCartbar" icon="shopping_cart" color="primary" />
   </q-page-sticky>
</template>

<script>
export default {
   methods: {
      openCartbar() {
         this.emitter.emit("toggle-sidebar", true)
      }
   },
}
</script>

<style lang="scss" scoped>
</style>
