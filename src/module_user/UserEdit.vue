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
                                <label class="col-xs-4 control-label" for="example-maxlength1">用户名称
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input ref="inputName" class="js-maxlength form-control" type="text" v-model="itemData.name" maxlength="20" readonly>
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
            this.itemData = _item;
        },
        ok: function () {
            let _name = this.itemData.name;
            let _this = this;
            this.$axios.post('users/' + _name + '/reset').then(function (response) {
                toastr.success("用户密码重置成功");
                _this.$eventHub.$emit('users.updated');
            }).catch(function (error) {
                toastr.error("用户密码重置异常 [" + _this.$constant.parseError(error) + "]");
            });

        }
    }
}
</script>
 
<style scoped lang="less">
</style>