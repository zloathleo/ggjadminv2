<template>
    <div class="block">
        <MsgAdd />
        <MsgEdit ref="modalEdit" />
        <MsgDelete ref="modalDelete" />
        <div class="block-header">
            <div class="block-options-simple">
                <button type="button" class="btn btn-minw btn-primary" v-on:click="addItem">
                    <i class="fa fa-plus"></i> 添加 </button>

                <button type="button" class="btn btn-minw btn-success" v-on:click="refreshTableData">
                    <i class="fa fa-refresh"></i> 刷新 </button>
            </div>
            <div class="block-title">消息管理</div>
        </div>

        <div class="block-content">
            <!-- DataTables init on table by adding .js-dataTable-full-pagination class, functionality initialized in js/pages/base_tables_datatables.js -->
            <table id="module_device_table" class="table table-bordered table-striped js-dataTable-full-pagination">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">消息内容</th>
                        <th class="text-center">生效时间</th>
                        <th class="text-center">结束时间</th>
                        <th class="text-center">状态</th>
                        <th class="text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData">
                        <td class="text-center">{{index + 1}}</td>
                        <td class="text-center">{{item.label}}</td>
                        <td class="text-center">{{$constant.parseDateTime(item.activeTime)}}</td>
                        <td class="text-center">{{$constant.parseDateTime(item.endTime)}}</td>
                        <td class="text-center">{{item.status}}</td>
                        <td class="text-center">
                            <button class="btn btn-xs btn-primary" type="button" v-on:click="editItem(item.label)">编辑</button>
                            <button class="btn btn-xs btn-danger" type="button" v-on:click="deleteItem(item.label)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>       
import MsgAdd from './MsgAdd.vue';
import MsgEdit from './MsgEdit.vue';
import MsgDelete from './MsgDelete.vue';
export default {
    components: { MsgAdd, MsgEdit, MsgDelete },
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
                    { "searchable": false },
                    { "searchable": false },
                    { "searchable": false },
                    { "searchable": false }
                ]
            });
            _tableParam.language.searchPlaceholder = '内容';

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
            this.$axios.get('/groups/{label}/messages').then(function (response) {
                let _data = response.data;
                console.log(_data);
                if (_data) {
                    _this.tableData = _data.rows;
                    toastr.success("获取表格数据");
                }
            }).catch(function (error) {
                toastr.error("获取表格数据异常 [" + error + "]");
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
            let _this = this;

            let _jqModal = $('#modal-item-delete');
            _jqModal.on('show.bs.modal', function (_event) {
                let _modal = _this.$refs.modalDelete;
                _modal.editData = {
                    itemLabel: _label
                }
            });
            _jqModal.modal('show');
        },
        preview: function () {

        }
    }
}
</script>
 
<style scoped lang="less">
</style>