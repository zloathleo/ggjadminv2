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
                        <div class="modal-title">上传二维码</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-xs-4 control-label">文件
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input class="btn btn-sm btn-default" type="file" accept=".png,.jpg,.mp4" maxlength="80" v-on:change="fileChanged">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">二维码描述
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
            itemData: {
            },
            selectedFile: undefined
        }
    },
    mounted() {
    },

    methods: {
        setItem: function () {
        },
        fileChanged: function (evt) {
            this.selectedFile = evt.target.files[0];
            console.log(this.selectedFile);
        },
        ok: function () {
            let _selectedFile = this.selectedFile;

            if (_selectedFile) {

                var form = new FormData()
                form.append('file', _selectedFile);
                form.append('type', "qr");
                form.append('des', this.itemData.des ? this.itemData.des : '')


                let _this = this;
                this.$axios.post('resources/add', form).then(function (response) {
                    toastr.success("添加资源成功");
                    _this.$eventHub.$emit('resources.updated');
                }).catch(function (error) {
                    toastr.error("添加数据异常 [" + _this.$constant.parseError(error) + "]");
                });
            } else {
                toastr.error("请选择文件");
            }
        }

    }
}
</script>
 
<style scoped lang="less">
</style>