<template>
  <div class="overflow-hidden loginbg" style="background-image: url(assets/img/photos/photo6@2x.jpg);">
    <div class="content pulldown bg-black-op overflow-hidden animated fadeIn">
      <div class="row text-center push">
        <div class="col-xs-6 col-xs-offset-3 col-lg-6 col-lg-offset-3">
          <!-- Title -->
          <img src="assets/img/login/logo.png" alt="">
          <!-- END Title -->

          <!-- Subscribe Form -->
          <div class="form-inline push-50-t">
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
                <button ref="loginSubmit" class="btn btn-sm btn-block btn-primary" v-on:click="login">系统登录</button>
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
import Storejs from 'store';
import jsmd5 from 'js-md5';
export default {
  mounted() {
    let _this = this;
    document.onkeydown = function (e) {
      var theEvent = window.event || e;
      var code = theEvent.keyCode || theEvent.which;
      // console.log(code);
      if (code == 13) {
        let _button = _this.$refs.loginSubmit;
        // console.log(_button);
        _this.$refs.loginSubmit.click();
        // $("#login_submit").click();
      }
    }
  },
  methods: {
    login: function () {
      let un = this.$refs.inputUsername.value;
      let pw = this.$refs.inputPassword.value;

      if (un && pw && un.length > 1 && pw.length > 0) {
        pw = jsmd5(pw);
        const url = '/account/login';
        var params = new URLSearchParams();
        params.append('name', un);
        params.append('password', pw);

        let _this = this;
        this.$axios({
          method: 'post',
          url: url,
          data: params
        }).then((res) => {

          toastr.success("用户登录成功");
          Storejs.set("user", res.data);
          setTimeout(function () {
            window.location.href = "index.html";
          }, 500);  

        }).catch(function (error) {
          // toastr.error("登录异常 [" + error + "]");
          toastr.error("登录异常 [" + _this.$constant.parseError(error) + "]");
        });
      } else {
        toastr.error("用户名,密码不合法或为空");
      }
    },
  }
}
</script>
 
<style scoped lang="less">
.loginbg {
  background-position: 0 50%;
  -webkit-background-size: cover;
  background-size: cover;
  height: 100%;
  background-repeat: no-repeat;
}
</style>