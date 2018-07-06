<template>
    <div class="block">

        <div class="block-header">
            <div class="block-options-simple">
                <router-link class="btn btn-xs btn-primary" :to="{name:'page_page_creater'}">
                    <i class="fa fa-plus"></i> 添加页面</router-link>

                <button type="button" class="btn btn-xs btn-warning" disabled>
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
                        <th class="text-center" style="width: 20%;">更新页面</th>
                        <th class="text-center">预览效果</th>
                        <th class="text-center" style="width: 20%;">发布页面</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData">
                        <td class="text-center">{{index + 1}}</td>
                        <td class="text-center font-w600">{{item.label}}</td>
                        <td class="text-center">{{$constant.parseDateTime(item.updateTime)}}</td>
                        <td class="text-center">
                            <router-link class="btn btn-xs btn-danger" :to="{name:'page_page_update',params:{ label: item.label }}">
                                <i class="fa fa-pencil"></i> 修改布局</router-link>
                        </td>
                        <td class="text-center">
                            <a v-if="item.label" class="btn btn-xs btn-warning" type="button" :href="'http://116.62.150.38:8080/client/index.html?page=' + item.label" target="_blank">预览
                            </a>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-xs btn-success" :data-label="item.label" type="button" v-on:click="public">发布到广告机
                                <i class="fa fa-pencil"></i>
                            </button>
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
            tableData: [],
        }
    },
    mounted() {
        this.initDataTableFullPagination();
    },
    updated: function () {
        //UI
        let _tableParam = this.$constant.newDataTableOptions();
        jQuery('#module_page_table').dataTable(_tableParam);
    },
    methods: {
        initDataTableFullPagination: function () {
            let _this = this;
            this.$axios.get('ymgl')
                .then(function (response) {
                    let _data = response.data;
                    if (_data) {
                        _this.tableData = _data.rows;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        public: function () {
            let _this = this;
            _this.$mem.state.publicPageName = window.event.target.getAttribute("data-label");


            this.$axios.get('sbgl/sb')
                .then(function (response) {
                    let _data = response.data;
                    if (_data) {
                        let _rows = _data.rows;
                        _this.$mem.commit("changeModalDeviceList", _rows);
                        $('#modal-public-device').modal('show');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    }


}
</script>
 
</style>