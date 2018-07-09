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
                        <div class="modal-title">添加用户</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="example-maxlength1">用户名称
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-md-6">
                                    <input ref="inputName" class="js-maxlength form-control" type="text" maxlength="20">
                                </div>
                            </div>

                            <!-- <div class="form-group">
                                <label class="col-md-4 control-label" for="val-skill">维护分组
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-md-6">
                                    <select class="form-control">
                                        <option value="1">一号分组</option>
                                        <option value="2">二号分组</option>
                                    </select>
                                </div>
                            </div> -->

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

        }
    },

    mounted() {

    },

    methods: {

        ok: function () {
            // var params = new URLSearchParams();
            // params.append('label', this.$refs.inputName.value);

            // let _this = this;
            // this.$axios.post('zygl/zb/add', params).then(function (response) { 

            //     _this.$eventHub.$emit('addLiveDone');

            // }).catch(function (error) {

            // });

            toastr.success("添加用户成功");
        }
    }
}
</script>
 
<style scoped lang="less">
</style>