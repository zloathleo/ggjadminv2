<template>
    <div class="block">

        <div class="block-header">
            <div class="block-options-simple">
                <button class="btn btn-xs btn-primary" type="button" disabled>
                    <i class="fa fa-plus"></i> 添加资源 </button>
                <button class="btn btn-xs btn-warning" type="button" disabled>
                    <i class="fa fa-refresh"></i> 刷新 </button>

                <div class="btn-group btn-group-xs">
                    <button class="btn btn-success" type="button" data-toggle="dropdown" aria-expanded="false" disabled>分类
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li>
                            <a tabindex="-1" href="javascript:void(0)">
                                <span class="badge pull-right">3</span>图片文件</a>
                        </li>
                        <li>
                            <a tabindex="-1" href="javascript:void(0)">
                                <span class="badge pull-right">1</span>视频文件</a>
                        </li>
                        <li>
                            <a tabindex="-1" href="javascript:void(0)">
                                <span class="badge pull-right">4</span>全部文件</a>
                        </li>
                    </ul>
                </div>
            </div>
            <h3 class="block-title">资源管理</h3>
        </div>

        <div class="block-content">
            <div class="row items-push js-gallery">
                <div class="col-sm-4 col-md-2 col-lg-2 animated fadeIn" v-for="(item, index) in tableData">
                    <a class="img-container" data-fancybox="gallery" :href="$axios.defaults.baseURL + 'ggmanager_resources/' + item.url">
                        <!-- <img src="small_1.jpg"> -->
                        <img class="img-responsive" :src="$axios.defaults.baseURL + 'ggmanager_resources/' + item.preview" alt="">
                        <div class="font-w600 push-5" style="text-align: center;font-size: 6px;">{{item.label}}</div>
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
export default {
    components: {},
    data: function () {
        return {
            tableData: [],
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData: function () {
            let _this = this;
            this.$axios.get('zygl/zy', {
            }).then(function (response) {
                let _data = response.data;
                if (_data) {
                    _this.tableData = _data.rows;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
    }


}
</script>
 
<style scoped lang="less">
</style>