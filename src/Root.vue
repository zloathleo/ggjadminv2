<template>
  <div style="height: 100%">
    <div v-if="$mem.state.isLogin == true" id="page-container" class="sidebar-l sidebar-o side-scroll header-navbar-fixed">
      <Sidebar/>
      <Navbar/>
      <MainContent/>
      <ModalLayer/>
    </div>

    <Login v-if="$mem.state.isLogin == false" />
  </div>
</template>

<script> 
import { Navbar, MainContent, Sidebar, ModalLayer } from './framework';
import Login from './Login.vue';
export default {
  name: 'Root',
  components: { Login, Navbar, MainContent, Sidebar, ModalLayer },
}
</script>