<template>
    <div class="block">
        <GroupAdd ref="modalAdd" />
        <GroupEdit ref="modalEdit" />
        <GroupDelete ref="modalDelete" />
        <div class="block-header">
            <div class="block-options-simple">
                <button type="button" class="btn btn-minw btn-primary" v-on:click="addItem">
                    <i class="fa fa-plus"></i> 添加 </button>

                <button type="button" class="btn btn-minw btn-success" v-on:click="reloadPage">
                    <i class="fa fa-refresh"></i> 刷新 </button>
            </div>
            <div class="block-title">分组管理</div>
        </div>

        <div class="block-content">
            <!-- DataTables init on table by adding .js-dataTable-full-pagination class, functionality initialized in js/pages/base_tables_datatables.js -->
            <table id="module_group_table" class="table table-bordered table-striped js-dataTable-full-pagination">
                <thead>
                    <tr> 
                        <th class="text-center">#</th>
                        <th class="text-center">分组名称</th>
                        <th class="text-center">屏幕类型</th>
                        <th class="text-center">屏幕宽度</th>
                        <th class="text-center">屏幕高度</th>
                        <th class="text-center">维护人员</th>
                        <th class="text-center">更新时间</th>
                        <th class="text-center">预览</th>
                        <th class="text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData"> 
                        <td class="text-center">{{index + 1}}</td>
                        <td class="text-center">{{item.name}}</td>
                        <td class="text-center">{{$constant.parseScreenType(item.type)}}</td>
                        <td class="text-center">{{item.width}}</td>
                        <td class="text-center">{{item.height}}</td>
                        <td class="text-center">{{item.user}}</td>
                        <td class="text-center">{{$constant.parseDateTime(item.updateTime)}}</td>
                        <td class="text-center">
                            <a class="btn btn-xs btn-info" :href="'http://116.62.150.38:8080/client/index.html?dn=' + item.label" target="_blank">预览
                            </a>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-xs btn-primary" type="button" v-on:click="editItem(item)">编辑</button>
                            <button class="btn btn-xs btn-danger" type="button" v-on:click="deleteItem(item)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>       
import GroupAdd from './GroupAdd.vue';
import GroupEdit from './GroupEdit.vue';
import GroupDelete from './GroupDelete.vue';
export default {
    components: { GroupAdd, GroupEdit, GroupDelete },
    data: function () {
        return {
            loadedTableData: false,//ui初次更新
            tableData: [],
        }
    },
    mounted() {
        this._initData();
        let _this = this;
        this.$eventHub.$on('groups.updated', function (data) {
            setTimeout(function () { location.reload(); }, 500);
        });
    },
    updated: function () {
        if (!this.loadedTableData) {
            //UI 初始化
            let _tableParam = this.$constant.newDataTableOptions(); 
            //定义搜索列
            _tableParam = Object.assign(_tableParam, {
                "columns": [ 
                    { "searchable": false },
                    { "searchable": true },
                    { "searchable": false },
                    { "searchable": false },
                    { "searchable": false },
                    { "searchable": true },
                    { "searchable": false },
                    { "searchable": false },
                    { "searchable": false }
                ]
            });
            _tableParam.language.searchPlaceholder = '名称/维护人员'; 
            jQuery('#module_group_table').dataTable(_tableParam);
            this.loadedTableData = true;
        } 
    },
    methods: {
        _initData: function () {
            this._refreshTableData();
        },
        _refreshTableData: function () {
            let _this = this;
            this.$axios.get('/groups').then(function (response) {
                let _data = response.data;
                if (_data) {
                    _this.tableData = _data.rows;
                }
            }).catch(function (error) {
                toastr.error("刷新表格数据异常 [" + _this.$constant.parseError(error) + "]");
            });
        },
        reloadPage: function () {
            location.reload();
        },
        
        addItem: function () {
            this.$refs.modalAdd.setItem();
            $('#modal-item-add').modal('show');
        },
        editItem: function (item) {
            this.$refs.modalEdit.setItem({
                label: item.label,
                name: item.name,
            });
            $('#modal-item-edit').modal('show');
        },
        deleteItem: function (item) {
            this.$refs.modalDelete.setItem({
                label: item.label,
                name: item.name,
            });
            $('#modal-item-delete').modal('show');
        },
        preview: function () {

        }
    }
}
</script>
 
<style scoped lang="less">
</style>