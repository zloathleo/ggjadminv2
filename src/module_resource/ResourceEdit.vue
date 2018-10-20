<template>

    <div class="modal fade" id="modal-item-edit" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <div class="modal-title">修改资源</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-xs-4 control-label">资源名称
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" readonly v-model="itemData.name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">资源链接
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="120" v-model="itemData.url">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">资源描述
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.des">
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
            itemData: {}
        }
    },
    mounted() {

    },

    methods: {
        setItem: function (_item) {
            let _this = this;

            this.$axios.get('/resources/' + _item.label, {
                params: {
                    'time': new Date().getTime()
                }
            }).then(function (response) {
                _this.itemData = response.data;
            }).catch(function (error) {
                toastr.error("获取数据异常 [" + _this.$constant.parseError(error) + "]");
            });
            
        },

        ok: function () {
            let _label = this.itemData.label;
            let _url = this.itemData.url;
            let _des = this.itemData.des;

            var form = new FormData()
            form.append('label', _label);
            form.append('url', _url);
            form.append('des', _des);

            let _this = this;
            this.$axios.post('resources/' + _label + '/update', form).then(function (response) {
                toastr.success("修改资源成功");
                _this.$eventHub.$emit('messages.updated');
            }).catch(function (error) {
                toastr.error("修改资源异常 [" + _this.$constant.parseError(error) + "]");
            });
        }
    }
}
</script>
 
<style scoped lang="less">
</style>