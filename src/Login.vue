<template>
    <div class="overflow-hidden loginbg" style="background-image: url(assets/img/photos/photo6@2x.jpg);">
        <div class="content pulldown bg-black-op overflow-hidden animated fadeIn">
            <div class="row text-center push">
                <div class="col-xs-6 col-xs-offset-3 col-lg-6 col-lg-offset-3">
                    <!-- Title -->
                    <!-- <h1 class="text-white push-5">鸿天科技</h1> -->
                    <img src="assets/img/login/logo.png" alt="">
                    <!-- END Title -->

                    <!-- Countdown -->
                    <div class="push-50">
                        <!-- Countdown.js (class is initialized in js/pages/base_pages_coming_soon.js), for more examples you can check out https://github.com/hilios/jQuery.countdown -->
                        <div class="js-countdown"></div>
                    </div>
                    <!-- END Countdown -->

                    <!-- Subscribe Form -->
                    <div class="form-inline push-10">
                        <div class="push-5-t">
                            <label class="sr-only text-white">用户名</label>
                            <input class="form-control" ref="inputUsername" placeholder="用户名..">
                        </div>
                        <div class="push-5-t">
                            <label class="sr-only text-white">密码</label>
                            <input class="form-control" ref="inputPassword" type="password" placeholder="密码 ..">
                        </div>

                        <div class="push-30-t">
                            <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                                <button class="btn btn-sm btn-block btn-primary" v-on:click="login">登录</button>
                            </div>
                        </div>
                    </div>
                    <!-- END Subscribe Form -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>     
export default {
    methods: {
        login: function () {
            if (this.$refs.inputUsername.value == "admin" && this.$refs.inputPassword.value == "admin") {
                this.$mem.commit("changeLogin", true);
            }
        }
    }
}
</script>
 
<style scoped lang="less">
</style>