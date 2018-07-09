import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: undefined,//type token

        modal_message_title: '标题',
        modal_message_content: '内容',

        //设备列表
        modalDeviceList: [],
        publicPageName: undefined,
        
        ///////////////////////////////////////
        //编辑页面名称
        gridStackPageName: undefined,
        //选中类型
        gridStackSelectItemType: 0,
        //选中的图元ID
        gridStackSelectItemId: undefined,
        //选中的图元
        gridStackSelectItem: undefined,

        //全部图元的附加属性
        gridStackAllItemCustomProperties: new Map(),
    },
    mutations: {
        setUser: function (state, value) {
            state.user = value;
        },
        changeModalMessage: function (state, value) {
            state.modal_message_title = value.title;
            state.modal_message_content = value.content;
        },
        changeModalDeviceList: function (state, value) {
            state.modalDeviceList = value; 
        },

        changeGridStackPageName: function (state, value) {
            state.gridStackPageName = value;
        },
        changeGridStackItemSelected: function (state, value) {
            state.gridStackSelectItemType = value.name;
            state.gridStackSelectItem = value.dom;
            state.gridStackSelectItemId = value.id;
        },
        //保存图元属性
        appendGridStackItemCustomProperties: function (state, value) {
            state.gridStackAllItemCustomProperties.set(value.id, value);
        },

        cleanGridStackItemCustomProperties: function (state, value) {
            state.gridStackAllItemCustomProperties.clear();
        }
    },

    getters: {

    }
});