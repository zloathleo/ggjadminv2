import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../Main.vue'; 
import PagePage from '../module_page/PagePage.vue'; 
import PagePageCreater from '../module_page/PagePageCreater.vue'; 
import PageResource from '../module_resource/PageResource.vue'; 
import PageDevice from '../module_device/PageDevice.vue'; 
import PageLive from '../module_live/PageLive.vue'; 

Vue.use(VueRouter);

export default new VueRouter({
  routes: [ 
    { name: '', path: '/', component: PageResource }, 
    { name: 'page_page', path: '/page_page', component: PagePage }, 
    { name: 'page_page_creater', path: '/page_page_creater', component: PagePageCreater }, 
    { name: 'page_page_update', path: '/page_page_update/:label', component: PagePageCreater }, 
    { name: 'page_resource', path: '/page_resource', component: PageResource }, 
    { name: 'page_device', path: '/page_device', component: PageDevice },  
    { name: 'page_live', path: '/page_live', component: PageLive },  
  ]
})
