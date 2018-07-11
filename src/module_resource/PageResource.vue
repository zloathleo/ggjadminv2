<template>
    <div class="block">
        <ResourceAdd ref="modalAdd" />
        <div class="block-header">
            <div class="block-options-simple">
                <button type="button" class="btn btn-minw btn-primary" v-on:click="addItem">
                    <i class="fa fa-plus"></i> 添加 </button>

                <button type="button" class="btn btn-minw btn-success" v-on:click="reloadPage">
                    <i class="fa fa-refresh"></i> 刷新 </button>

            </div>
            <h3 class="block-title">资源管理</h3>
        </div>

        <div class="block-content">
            <div class="row items-push js-gallery">
                <div class="col-sm-4 col-md-2 animated fadeIn" v-for="(item, index) in tableData">
                    <a class="img-container" data-fancybox="gallery" :href="$axios.defaults.baseURL + 'ggmanager_resources/' + $mem.state.user.group + '/' + item.name">
                        <!-- <img src="small_1.jpg"> -->
                        <img class="img-responsive" :src="$axios.defaults.baseURL + 'ggmanager_resources/' + $mem.state.user.group + '/'+ item.thumbnail" alt="">
                        <div class="push-5" style="text-align: center;font-size: 6px;">{{item.label}}</div>
                        </img>

                        <div class="img-options">
                            <div class="img-options-content">
                                <div class="text-white">{{item.des}}</div>
                            </div>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>     
import ResourceAdd from './ResourceAdd.vue';
export default {
    components: { ResourceAdd },
    data: function () {
        return {
            tableData: [],
        }
    },
    mounted() {
        this.initData();
        let _this = this;
        this.$eventHub.$on('resources.updated', function (data) {
            setTimeout(function () { location.reload(); }, 500);
        });
    },
    methods: {
        initData: function () {
            let _this = this;
            this.$axios.get('resources').then(function (response) {
                let _data = response.data;
                if (_data) {
                    _this.tableData = _data.rows;
                }
            }).catch(function (error) {
                toastr.error("刷新数据异常 [" + _this.$constant.parseError(error) + "]");
            });
        },

        reloadPage: function () {
            location.reload();
        },

        addItem: function () {
            this.$refs.modalAdd.setItem();
            $('#modal-item-add').modal('show');
        },
    }


}
</script>
 
<style scoped lang="less">
</style>