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
                        <div class="modal-title">重置用户密码</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="example-maxlength1">用户名称
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-md-6">
                                    <input ref="inputName" class="js-maxlength form-control" type="text" :value="editData?editData.itemLabel:''" maxlength="20" disabled>
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
            editData: undefined
        }
    },

    mounted() {

    },

    methods: {

        ok: function () {
            let _label = this.editData.itemLabel; 
            let _this = this;
            this.$axios.post('users/' + _label + '/reset').then(function (response) {
                toastr.success("用户密码重置成功");
            }).catch(function (error) {
                toastr.error("用户密码重置异常 [" + error + "]");
            });

        }
    }
}
</script>
 
<style scoped lang="less">
</style>