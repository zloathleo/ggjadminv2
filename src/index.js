import Vue from 'vue';
import Vuex from 'vuex';
import Storejs from 'store';

import Router from './router';
import Constant from './common/constant';
import Mem from './common/mem';
import Axios from './common/axios';

import IndexRoot from './page_index/IndexRoot.vue';

Vue.config.productionTip = false;

//用户信息检查 
let _user = Storejs.get("user"); 
if (_user) { 
    if (_user.type && _user.token) {
        Mem.state.user = _user;
    } else {
        window.location.href = "login.html";
    }
} else {
    window.location.href = "login.html";
}
//toastr 配置
toastr.options.closeButton = true;
toastr.options.positionClass = "toast-top-center";
toastr.options.timeOut = 3000;
toastr.options.extendedTimeOut = 1000;

//事件配置
var vueEventHub = new Vue(); 
window.gridStackSelectItemCallback = function (_name) {
    let _dom = window.event.target.parentNode.parentNode;
    vueEventHub.$emit('gridStackSelectItemChange', {
        dom: _dom,
        type: _name
    });
}

Vue.prototype.$mem = Mem;
Vue.prototype.$constant = Constant;
Vue.prototype.$axios = Axios;
Vue.prototype.$eventHub = vueEventHub;  

new Vue({
    el: '#root',
    router: Router,
    components: { IndexRoot },
    template: '<IndexRoot/>'
});
