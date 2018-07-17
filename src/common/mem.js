import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: undefined,//type token 

        groupInfo: {
            width: 400,
            height: 700
        },
        /////////////////////////////////////// 
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
        changeGridStackItemSelected: function (state, value) {
            state.gridStackSelectItemType = value.name;
            state.gridStackSelectItem = value.dom;
            state.gridStackSelectItemId = value.id;
        },
        clearGridStackItemSelected: function (state) {
            state.gridStackSelectItemType = 0;
            state.gridStackSelectItem = undefined;
            state.gridStackSelectItemId = undefined;
        },
        //保存图元属性
        appendGridStackItemCustomProperties: function (state, value) { 
            state.gridStackAllItemCustomProperties.set(value.id, value);
        },
        //remove
        removeGridStackItemCustomProperties: function (state, _id) { 
            state.gridStackAllItemCustomProperties.delete(_id);
        },
        cleanGridStackItemCustomProperties: function (state, value) {
            state.gridStackAllItemCustomProperties.clear();
        }
    },

    getters: {

    }
});