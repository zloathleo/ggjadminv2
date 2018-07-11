<template>
    <div class="block">
        <UserAdd ref="modalAdd" />
        <UserEdit ref="modalEdit" />
        <UserDelete ref="modalDelete" />
        <div class="block-header">
            <div class="block-options-simple">
                <button type="button" class="btn btn-minw btn-primary" v-on:click="addItem">
                    <i class="fa fa-plus"></i> 添加 </button>

                <button type="button" class="btn btn-minw btn-success" v-on:click="reloadPage">
                    <i class="fa fa-refresh"></i> 刷新 </button>
            </div>
            <div class="block-title">用户管理</div>
        </div>

        <div class="block-content">
            <!-- DataTables init on table by adding .js-dataTable-full-pagination class, functionality initialized in js/pages/base_tables_datatables.js -->
            <table id="module_device_table" class="table table-bordered table-striped js-dataTable-full-pagination">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">用户名称</th>
                        <th class="text-center">类型</th>
                        <th class="text-center">维护分组</th>
                        <th class="text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData">
                        <td class="text-center">{{index + 1}}</td>
                        <td class="text-center">{{item.name}}</td>
                        <td class="text-center">{{item.type}}</td>
                        <td class="text-center">{{item.group}}</td>
                        <td class="text-center">
                            <button class="btn btn-xs btn-primary" type="button" v-on:click="editItem(item)">重置密码</button>
                            <button class="btn btn-xs btn-danger" type="button" v-on:click="deleteItem(item)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>       
import UserAdd from './UserAdd.vue';
import UserEdit from './UserEdit.vue';
import UserDelete from './UserDelete.vue';
export default {
    components: { UserAdd, UserEdit, UserDelete },
    data: function () {
        return {
            loadedTableData: false,//ui初次更新
            tableData: [],
        }
    },
    mounted() {
        this._initData();

        let _this = this;
        this.$eventHub.$on('users.updated', function (data) {
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
                    { "searchable": true },
                    { "searchable": false }
                ]
            });
            _tableParam.language.searchPlaceholder = '名称/维护分组';
            $('#module_device_table').DataTable(_tableParam);
            this.loadedTableData = true;
        }
    },
    methods: {
        _initData: function () {
            this._refreshTableData();
        },
        _refreshTableData: function () {
            //更新按钮操作
            let _this = this;
            this.$axios.get('/users').then(function (response) {
                let _data = response.data;
                console.log(_data);
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
                name: item.name,
            });
            $('#modal-item-edit').modal('show');
        },
        deleteItem: function (item) {
            this.$refs.modalDelete.setItem({
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