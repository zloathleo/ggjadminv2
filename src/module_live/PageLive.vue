<template>
    <div class="block">

        <div class="block-header">
            <div class="block-options-simple">
                <button type="button" class="btn btn-xs btn-primary" v-on:click="addLive">
                    <i class="fa fa-plus"></i> 添加直播 </button>

                <button type="button" class="btn btn-xs btn-warning" disabled>
                    <i class="fa fa-refresh"></i> 刷新 </button>
            </div>
            <h3 class="block-title">直播管理</h3>
        </div>

        <div class="block-content">

            <!-- DataTables init on table by adding .js-dataTable-full-pagination class, functionality initialized in js/pages/base_tables_datatables.js -->
            <table id="module_device_table" class="table table-bordered table-striped js-dataTable-full-pagination">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">直播名称</th>
                        <th class="text-center">描述</th>
                        <th class="text-center">更新时间</th>
                        <th class="text-center">预览</th>
                        <th class="text-center">导出配置</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData">
                        <td class="text-center">{{index + 1}}</td>
                        <td class="text-center font-w600">{{item.label}}</td>
                        <td class="text-center">{{item.des}}</td>
                        <td class="text-center">
                            {{$constant.parseDateTime(item.updateTime)}}
                        </td>
                        <td class="text-center">
                            <a v-if="item.label" class="btn btn-xs btn-warning" :href="'live_pre.html?name=' + item.label" target="_blank">预览 </a>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-xs btn-success" :data-label="item.label" type="button" v-on:click="exportLive">导出直播配置
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
            hasInitTable: false,
        }
    },
    mounted() {
        this.initData();

        let _this = this;
        this.$eventHub.$on('addLiveDone', function (data) {
            _this.initData();
        });
    },

    updated: function () {
        if (!this.hasInitTable) {
            this.initTable();
            this.hasInitTable = true;
        }

    },

    methods: {
        initTable: function () {
            //UI
            let _tableParam = this.$constant.newDataTableOptions();
            jQuery('#module_device_table').dataTable(_tableParam);
        },
        initData: function () {
            let _this = this;
            this.$axios.get('zygl/zb').then(function (response) {
                let _data = response.data;
                if (_data) {
                    _this.tableData = _data.rows;
                }

            }).catch(function (error) {
                console.log(error);
            });
        },
        addLive: function () {
            $('#modal-add-live').modal('show');
        },
        exportLive: function () {
            let _this = this;
            let _exportLiveName = window.event.target.getAttribute("data-label");


            this.$constant.downloadFile('zygl/zb/' + _exportLiveName + '/export');

            // this.$axios.get('zygl/zb/' + _exportLiveName + '/export')
            //     .then(function (response) {
            //         let _data = response.data;
            //         if (_data) {
            //             let _rows = _data.rows;
            //             _this.$mem.commit("changeModalDeviceList", _rows);
            //             $('#modal-public-device').modal('show');
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }
    }
}
</script>
 
<style scoped lang="less">
</style>