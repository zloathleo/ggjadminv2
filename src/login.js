import Vue from 'vue';
import Vuex from 'vuex';

import Axios from './common/axios';

import LoginRoot from './page_login/LoginRoot.vue';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

new Vue({
    el: '#root',
    components: { LoginRoot },
    template: '<LoginRoot/>'
});