<template>
    <div>
        <!-- Header -->
        <header id="header-navbar" class="content-mini content-mini-full">
            <!-- Header Navigation Right -->
            <ul class="nav-header pull-right">
                <li>
                    <div class="btn-group">
                        <button class="btn btn-default btn-image dropdown-toggle" data-toggle="dropdown" type="button">
                            <img src="assets/img/avatars/avatar10.jpg" alt="Avatar">
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li v-on:click="modifyPw" class="cursor-pointer">
                                <a>
                                    <i class="si si-settings pull-right"></i>修改用户密码
                                </a>
                            </li>
                            <li v-on:click="logout" class="cursor-pointer">
                                <a>
                                    <i class="si si-logout pull-right"></i>退出系统
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <!-- END Header Navigation Right -->
            <!-- Header Navigation Left -->
            <ul class="nav-header pull-left">
                <li class="">
                    <button class="btn btn-default" data-toggle="layout" data-action="sidebar_mini_toggle" type="button">
                        <i class="fa fa-ellipsis-v"></i>
                    </button>
                </li>
                <li style="margin-top: 5px;">
                    {{$mem.state.user.name}},你好
                </li>
            </ul>
            <!-- END Header Navigation Left -->
        </header>
        <!-- END Header -->
        <MyModifyPw ref="modalEdit" />
    </div>
</template>

<script>   
import Storejs from 'store';
import MyModifyPw from './modal/MyModifyPw.vue';
export default {
    components: { MyModifyPw },
    methods: {
        modifyPw: function () {
            this.$refs.modalEdit.setItem();
            $('#modal-user-update').modal('show');

            // let _this = this; 
            // const url = '/account/update';
            // var params = new URLSearchParams();
            // params.append('oldpassword', this.$mem.state.publicPageName);
            // params.append('newpassword', _labels);

            // this.$axios({
            //     method: 'post',
            //     url: url
            // }).then((res) => {
            //     setTimeout(function () {
            //         toastr.success("修改密码成功");
            //         window.location.href = "login.html";
            //     }, 1000);
            // }).catch(function (error) {
            //     toastr.error("修改密码异常 [" + _this.$constant.parseError(error) + "]");
            // });
        },
        logout: function () {
            Storejs.remove('user');
            const url = '/account/logout';
            this.$axios({
                method: 'post',
                url: url
            }).then((res) => {
                window.location.href = "login.html";
            }).catch(function (error) {
                toastr.error("退出异常");
                window.location.href = "login.html";
            });

        },
    }
}
</script>

<style scoped lang="less">
</style>