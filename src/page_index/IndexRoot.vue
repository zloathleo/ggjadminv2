<template>
  <div style="height: 100%">
    <div id="page-container" class="sidebar-l sidebar-o side-scroll header-navbar-fixed">
      <Sidebar/>
      <Navbar/>
      <MainContent/>
      <!-- <ModalLayer/> -->
    </div>
  </div>
</template>

<script> 
import { Navbar, MainContent, Sidebar, ModalLayer } from '../framework';
export default {
  name: 'Root',
  components: { Navbar, MainContent, Sidebar, ModalLayer },
}
</script>