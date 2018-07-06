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
                    <!-- <ul class="dropdown-menu dropdown-menu-right">  -->
                        <!-- <li>
                            <a tabindex="-1" href="base_pages_lock.html">
                                <i class="si si-lock pull-right"></i>锁屏
                            </a>
                        </li>
                        <li>
                            <a tabindex="-1" href="base_pages_login.html">
                                <i class="si si-logout pull-right"></i>退出系统
                            </a>
                        </li> -->
                    <!-- </ul> -->
                </div>
            </li>
        </ul>
        <!-- END Header Navigation Right -->

        <!-- Header Navigation Left -->
        <ul class="nav-header pull-left"> 
            <!-- <li class=""> 
                <button class="btn btn-default" data-toggle="layout" data-action="sidebar_mini_toggle" type="button">
                    <i class="fa fa-ellipsis-v"></i>
                </button>
            </li>
            <li> 
                <button class="btn btn-default pull-right" data-toggle="modal" data-target="#apps-modal" type="button">
                    <i class="si si-grid"></i>
                </button>
            </li>  -->
        </ul>
        <!-- END Header Navigation Left -->
    </header>
    <!-- END Header -->
</template>

<script>   
// const ipcRenderer = require('electron').ipcRenderer;
export default {
    name: 'Navbar',

}
</script>

<style scoped lang="less">
</style>