import Vue from 'vue';
import Vuex from 'vuex';

import 'url-search-params-polyfill';

import './common/initjs';
import Axios from './common/axios'; 
import Constant from './common/constant';
import LoginRoot from './page_login/LoginRoot.vue';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;
Vue.prototype.$constant = Constant;
new Vue({
    el: '#root',
    components: { LoginRoot },
    template: '<LoginRoot/>'
});