<template>
    <div class="block">
        <UserAdd />
        <UserEdit ref="modalEdit" />
        <div class="block-header">
            <div class="block-options-simple">
                <button type="button" class="btn btn-minw btn-primary" v-on:click="addItem">
                    <i class="fa fa-plus"></i> 添加 </button>

                <button type="button" class="btn btn-minw btn-success" v-on:click="refreshTableData">
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
                        <th class="text-center">维护分组</th>
                        <th class="text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData"> 
                        <td class="text-center">{{index + 1}}</td>
                        <td class="text-center">{{item.label}}</td>
                        <td class="text-center">{{item.group}}</td>
                        <td class="text-center">
                            <button class="btn btn-xs btn-primary" type="button" v-on:click="editItem(item.label)">重置密码</button>
                            <button class="btn btn-xs btn-danger" type="button" v-on:click="deleteItem(item.label)">删除</button>
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
export default {
    components: { UserAdd, UserEdit },
    data: function () {
        return {
            loadedTableData: false,//ui初次更新
            tableData: [],
        }
    },
    mounted() {
        this.initData();
    },
    updated: function () {
        if (!this.loadedTableData) {
            //UI
            let _tableParam = this.$constant.newDataTableOptions();

            //定义搜索列
            _tableParam = Object.assign(_tableParam, {
                "columns": [ 
                    { "searchable": false },
                    { "searchable": true },
                    { "searchable": true },
                    { "searchable": false }
                ]
            });
            _tableParam.language.searchPlaceholder = '名称/维护分组';

            jQuery('#module_device_table').dataTable(_tableParam);
            this.loadedTableData = true;
        }

    },
    methods: {
        initData: function () {
            this.refreshTableData();
        },
        refreshTableData: function () {
            //更新按钮操作
            let _this = this;
            this.$axios.get('/users').then(function (response) {
                let _data = response.data;
                console.log(_data);
                if (_data) {
                    _this.tableData = _data.rows;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        addItem: function () {
            $('#modal-item-add').modal('show');
        },
        editItem: function (_label) {
            let _this = this;

            let _jqModal = $('#modal-item-edit');
            _jqModal.on('show.bs.modal', function (_event) {
                let _modal = _this.$refs.modalEdit;
                _modal.editData = {
                    itemLabel: _label
                }
            });
            _jqModal.modal('show');
        },
        deleteItem: function (_label) {

        },
        preview: function () {

        }
    }
}
</script>
 
<style scoped lang="less">
</style>