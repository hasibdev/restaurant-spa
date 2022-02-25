<template>
   <q-page>
      <div class="flex full-height">
         <!-- lEFT SIDE -->
         <div class="bg-grey-2 grow-1">
            <h4>REVIEW ORDER</h4>
         </div>
         <!-- RIGHT SIDE -->
         <div>
            <h4>BACK TO MENU</h4>
         </div>
      </div>
   </q-page>
</template>

<script>
export default {

   mounted() {
      this.emitter.emit("toggle-sidebar", false)
   },

}
</script>

<style lang="scss" scoped>
.grow-1 {
   flex-grow: 1;
}
</style>
