<template>
  <!-- Main Container -->
  <main id="main-container">

    <div class="content">
      <MainNavTabsContent />
    </div>

  </main>
  <!-- END Main Container -->
</template>

<script>   
import MainNavTabsContent from './MainNavTabsContent.vue';
export default {
  name: 'MainContent',
  components: { MainNavTabsContent },

}
</script>
 
<style scoped lang="less">
</style>