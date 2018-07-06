<template>
    <div class="block">

        <div class="block-header">
            <div class="block-options-simple">
                <!-- <router-link class="btn btn-xs btn-primary">
                    <i class="fa fa-plus"></i> 添加设备
                </router-link> -->

                <button type="button" class="btn btn-xs btn-warning" disabled>
                    <i class="fa fa-refresh"></i> 刷新 </button>
            </div>
            <h3 class="block-title">广告机管理</h3>
        </div>

        <div class="block-content">

            <!-- DataTables init on table by adding .js-dataTable-full-pagination class, functionality initialized in js/pages/base_tables_datatables.js -->
            <table id="module_device_table" class="table table-bordered table-striped js-dataTable-full-pagination">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">广告机名称</th>
                        <th class="text-center">广告机描述</th>
                        <th class="text-center">显示页面名称</th>
                        <th class="text-center">更新时间</th>
                        <th class="text-center">预览效果</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData">
                        <td class="text-center">{{index + 1}}</td>
                        <td class="text-center font-w600">{{item.label}}</td>
                        <td class="text-center">{{item.des}}</td>
                        <td class="text-center">
                            {{item.ymLabel}}
                        </td>
                        <td class="text-center">
                            {{$constant.parseDateTime(item.updateTime)}}
                        </td>
                        <td class="text-center">
                            <a v-if="item.ymLabel" class="btn btn-xs btn-warning" type="button" :href="'http://116.62.150.38:8080/client/index.html?dn=' + item.label" target="_blank">预览
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>     
var deviceList = require('../mock/device.json');
import DeviceItem from './DeviceItem.vue';
export default {
    components: { DeviceItem },
    data: function () {
        return {
            tableData: [],
        }
    },
    mounted() {
        this.initData();
    },
    updated: function () {
        //UI
        let _tableParam = this.$constant.newDataTableOptions();
        jQuery('#module_device_table').dataTable(_tableParam);
    },
    methods: {
        initData: function () {
            let _this = this;
            this.$axios.get('sbgl/sb').then(function (response) {
                let _data = response.data;
                if (_data) {
                    _this.tableData = _data.rows;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        preview: function () {

        }
    }
}
</script>
 
<style scoped lang="less">
</style>