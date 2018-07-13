<template>

    <div class="modal fade" id="modal-imageselect" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="block block-themed block-transparent remove-margin-b">
                    <div class="block-header bg-primary-dark">
                        <ul class="block-options">
                            <li>
                                <button data-dismiss="modal" type="button">
                                    <i class="si si-close"></i>
                                </button>
                            </li>
                        </ul>
                        <div class="modal-title">选择图片</div>
                    </div>
                    <div class="block-content">
                        <select class="image-picker" data-limit="5" multiple="multiple">
                            <option style="max-width: 100px;max-height: 100px;" v-for="(item, index) in tableData" :data-img-src="$axios.defaults.baseURL + 'ggmanager_resources/' + $mem.state.user.group + '/'+ item.thumbnail" :value="item.name">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-default" type="button" data-dismiss="modal">关闭</button>
                    <button class="btn btn-sm btn-primary" type="button" data-dismiss="modal" v-on:click="ok">
                        <i class="fa fa-check"></i> 确定</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>    
export default {
    data: function () {
        return {
            tableData: [],//图片资源
            initImagePicker: false,//ui初次更新
            selectedItems: [],//选中
            // itemData: {
            // },
        }
    },
    updated: function () {
        if (!this.initImagePicker) {
            //UI 初始化
            $(".image-picker").imagepicker({
                initialized: function () {
                    //待续
                }
            });
            this.initImagePicker = true;
        }
    },
    mounted() {
        let _this = this;
        this.$axios.get('resources', {
            params: {
                type: "img"
            }
        }).then(function (response) {
            let _data = response.data;
            if (_data) {
                _this.tableData = _data.rows;
            }
        }).catch(function (error) {
            toastr.error("刷新数据异常 [" + _this.$constant.parseError(error) + "]");
        });
    },

    methods: {
        setItem: function (_item) {
            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _gridStackSelectItemId = this.$mem.state.gridStackSelectItemId;
            let customPros = _customProperties.get(_gridStackSelectItemId);
            this.selectedItems = customPros.images;
        },
        ok: function () {
            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _gridStackSelectItemId = this.$mem.state.gridStackSelectItemId;
            let customPros = _customProperties.get(_gridStackSelectItemId);
            let _images = $(".image-picker").val();
            customPros.images = _images;
            console.log(customPros);
        }

    }
}
</script>
 
<style scoped lang="less">
</style>