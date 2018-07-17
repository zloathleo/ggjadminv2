<template>

    <div class="modal fade" id="modal-user-update" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <div class="modal-title">修改密码</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-xs-4 control-label" for="val-skill">原密码
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="password" maxlength="20" v-model="itemData.old">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">新密码
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.new">
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
import Storejs from 'store';
import jsmd5 from 'js-md5';
export default {
    data: function () {
        return {
            itemData: {
            },
        }
    },
    mounted() {
    },
    methods: {
        setItem: function () {
            this.itemData = {};
        },
        ok: function () {
            let _old = this.itemData.old;
            let _new = this.itemData.new;

            let _this = this;
            const url = '/account/update';
            var params = new URLSearchParams();
            params.append('oldpassword', jsmd5(_old));
            params.append('newpassword', jsmd5(_new));

            this.$axios.post('/account/update', params).then((res) => {
                toastr.success("修改密码成功");
                Storejs.remove('user');
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1500);
            }).catch(function (error) {
                toastr.error("修改密码异常 [" + _this.$constant.parseError(error) + "]");
            });
        }

    }
}
</script>
 
<style scoped lang="less">
</style>