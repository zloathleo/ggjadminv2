<template>
    <!-- Sidebar -->
    <nav id="sidebar">
        <!-- Sidebar Scroll Container -->
        <div id="sidebar-scroll">
            <!-- Sidebar Content -->
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
                    <ul v-if="$mem.state.user.type == 'admin'" class="nav-main">
                        <li class="cursor-pointer">
                            <a v-bind:class="{ active: isActive('page_group') }" v-on:click="clickItem('page_group')">
                                <i class="si si-grid"></i>
                                <span class="sidebar-mini-hide">分组管理</span>
                            </a>
                        </li>
                        <li class="cursor-pointer">
                            <a v-bind:class="{ active: isActive('page_user') }" v-on:click="clickItem('page_user')">
                                <i class="si si-user"></i>
                                <span class="sidebar-mini-hide">用户管理</span>
                            </a>
                        </li>
                    </ul>
                    <ul v-if="$mem.state.user.type == 'operater'" class="nav-main">
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
    data() {
        return {
            activeName: undefined //当activeName初始值为空时，浏览器加载时默认没有选择的列表项，当为hello时，hello列表默认被选中
        }
    },
    methods: {
        clickItem: function (routerName) {
            this.activeName = routerName;
            this.$router.push({ name: routerName });
        },
        isActive: function (routerName) {
            return this.activeName == routerName;
        }
    }
}
</script>