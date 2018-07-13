<template>

    <div class="modal fade" id="modal-item-add" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
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
                        <div class="modal-title">添加广告机</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-xs-4 control-label" for="example-maxlength1">广告机名称
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-4 control-label" for="example-maxlength1">广告机品牌
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.brand">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-4 control-label" for="example-maxlength1">广告机型号
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.model">
                                </div>
                            </div>

                        </form>
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
            itemData: {},
        }
    },
    mounted() {
    },

    methods: {
        setItem: function () {
        },
        ok: function () {
            let _name = this.itemData.name;
            let _brand = this.itemData.brand;
            let _model = this.itemData.model;

            if (_name && !_name.isBlank()) {
                _name = _name.trim();

                var params = new URLSearchParams();
                params.append('name', _name);
                params.append('brand', _brand);
                params.append('model', _model);

                let _this = this;
                this.$axios.post('devices/add', params).then(function (response) {
                    toastr.success("添加广告机成功");
                    _this.$eventHub.$emit('devices.updated');
                }).catch(function (error) {
                    toastr.error("添加数据异常 [" + _this.$constant.parseError(error) + "]");
                });
            } else {
                toastr.error("用户名不合法或为空");
            }

        }
    }
}
</script>
 
<style scoped lang="less">
</style>