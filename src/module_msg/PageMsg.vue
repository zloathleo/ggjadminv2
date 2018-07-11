<template>
    <div class="block">
        <MsgAdd ref="modalAdd" />
        <MsgEdit ref="modalEdit" />
        <MsgDelete ref="modalDelete" />
        <div class="block-header">
            <div class="block-options-simple">
                <button type="button" class="btn btn-minw btn-primary" v-on:click="addItem">
                    <i class="fa fa-plus"></i> 添加 </button>

                <button type="button" class="btn btn-minw btn-success" v-on:click="reloadPage">
                    <i class="fa fa-refresh"></i> 刷新 </button>
            </div>
            <div class="block-title">消息管理</div>
        </div>

        <div class="block-content">
            <table id="module_device_table" class="table table-bordered table-striped js-dataTable-full-pagination">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">消息类型</th>
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
                        <td class="text-center">{{item.type}}</td>
                        <td class="text-center">{{item.name}}</td>
                        <td class="text-center">{{$constant.parseDateTime(item.startTime)}}</td>
                        <td class="text-center">{{$constant.parseDateTime(item.endTime)}}</td>
                        <td class="text-center">{{$constant.parseMsgState(1)}}</td>
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
        this._initData();
        let _this = this;
        this.$eventHub.$on('messages.updated', function (data) {
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
        _initData: function () {
            this._refreshTableData();
        },
        _refreshTableData: function () {
            //更新按钮操作
            let _this = this;
            this.$axios.get('/messages').then(function (response) {
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