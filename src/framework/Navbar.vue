<template>
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
                        <li v-on:click="logout">
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
        </ul>
        <!-- END Header Navigation Left -->
    </header>
    <!-- END Header -->
</template>

<script>   
import Storejs from 'store';
export default {
    name: 'Navbar',
    methods: {
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