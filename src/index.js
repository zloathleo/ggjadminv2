import Vue from 'vue';
import Vuex from 'vuex';
import Storejs from 'store';

import 'url-search-params-polyfill';

import './common/initjs';
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
        Axios.defaults.headers.accessToken = _user.token;
    } else {
        window.location.href = "login.html";
    }
} else {
    window.location.href = "login.html";
}

//验证用户信息
Axios.get('/account/info').then(function (response) { 
}).catch(function (error) {
    window.location.href = "login.html";
});

//toastr 配置
toastr.options.closeButton = true;
toastr.options.positionClass = "toast-top-center";
toastr.options.timeOut = 3000;
toastr.options.extendedTimeOut = 1000;

var _closePage = function () {
    Storejs.remove('user');
}

//事件配置
var vueEventHub = new Vue();
window.gridStackSelectItemCallback = function (_name) {
    event.stopPropagation();
    event.preventDefault();
    let _target = window.event.target;
    console.log(_target);

    let _dom = _target.parentNode.parentNode;
    console.log("selected gridStack item:" + _name);
    vueEventHub.$emit('gridStackSelectItemChange', {
        dom: _dom,
        type: _name
    });


}
window.gridStackRemoveItemCallback = function (_itemId) {
    event.stopPropagation();
    event.preventDefault();
    let _target = window.event.target;

    // let _dom = _target.parentNode.parentNode.parentNode.parentNode;
    let _dom = $("#pn-" + _itemId);
    vueEventHub.$emit('gridStackRemoveItem', {
        dom: _dom,
        itemId: _itemId,
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
