<template>
    <!-- Sidebar -->
    <nav id="sidebar">
        <!-- Sidebar Scroll Container -->
        <div id="sidebar-scroll">
            <!-- Sidebar Content -->
            <!-- Adding .sidebar-mini-hide to an element will hide it when the sidebar is in mini mode -->
            <div class="sidebar-content">
                <!-- Side Header -->
                <div class="side-header side-content bg-white-op">

                    <a class="h5 text-white" href="index.html">
                        <i class="fa fa-circle-o-notch text-primary"></i>
                        <span class="h5 font-w600 sidebar-mini-hide">后台管理</span>
                    </a>
                </div>
                <!-- END Side Header -->

                <!-- Side Content -->
                <div class="side-content">
                    <ul class="nav-main">
                        <li>
                            <router-link :to="{name:'page_device'}">广告机管理</router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'page_page'}">页面管理</router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'page_live'}">直播视频</router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'page_resource'}">资源管理</router-link>
                        </li>

                    </ul>
                </div>
                <!-- END Side Content -->
            </div>
            <!-- Sidebar Content -->
        </div>
        <!-- END Sidebar Scroll Container -->
    </nav>
    <!-- END Sidebar -->
</template>

<script> 
export default {
    methods: {

    }
}
</script>