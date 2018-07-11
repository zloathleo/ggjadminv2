<template>
    <div class="block">

        <div class="block-header">
            <div class="block-options-simple">
                <button type="button" class="btn btn-minw btn-primary" v-on:click="addItem">
                    <i class="fa fa-plus"></i> 添加 </button>

                <button type="button" class="btn btn-minw btn-success" v-on:click="reloadPage">
                    <i class="fa fa-refresh"></i> 刷新 </button>
            </div>
            <h3 class="block-title">页面管理</h3>
        </div>

        <div class="block-content">

            <table id="module_page_table" class="table table-bordered table-striped js-dataTable-full-pagination">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">页面名称</th>
                        <th class="text-center">页面修改时间</th>
                        <th class="text-center" style="width: 20%;">更新</th>
                        <th class="text-center">操作</th>
                        <th class="text-center" style="width: 20%;">激活</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData">
                        <td class="text-center">{{index + 1}}</td>
                        <td class="text-center font-w600">{{item.name}}</td>
                        <td class="text-center">{{$constant.parseDateTime(item.updateTime)}}</td>
                        <td class="text-center">
                            <button class="btn btn-xs btn-primary" type="button" v-on:click="editItem(item)">更新布局 </button>
                        </td>
                        <td class="text-center">
                            <a v-if="item.label" class="btn btn-xs btn-primary" type="button" :href="'http://116.62.150.38:8080/client/index.html?page=' + item.label" target="_blank">预览
                            </a>
                            <button class="btn btn-xs btn-danger" type="button" v-on:click="deleteItem(item)">删除 </button>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-xs btn-success" type="button" v-on:click="publicItem(item)">激活 </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>     
export default {
    components: {},
    data: function () {
        return {
            loadedTableData: false,//ui初次更新
            tableData: [],
        }
    },

    mounted() {
        this._initData();
        let _this = this;
        this.$eventHub.$on('pages.updated', function (data) {
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
                    { "searchable": false }
                ]
            });
            _tableParam.language.searchPlaceholder = '页面名称';
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
            this.$axios.get('/pages').then(function (response) {
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
            this.$router.push({ name: 'page_page_creater' });
        },
        editItem: function (item) {
            this.$router.push({ name: 'page_page_update', params: { label: item.label } });
        },
        deleteItem: function (item) {
            // this.$refs.modalDelete.setItem({
            //     label: item.label,
            //     name: item.name,
            // });
            // $('#modal-item-delete').modal('show');
        },
        publicItem: function (item) {
        },
    }


}
</script>
 
</style>