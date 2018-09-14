<template>
    <div class="block">

        <div class="block-header">
            <h3 class="block-title">直播管理</h3>
        </div>

        <div class="block-content">

            <div class="row" style="padding-bottom: 50px;">

                <div class="col-xs-6 col-xs-offset-3">
                    <!-- <button type="button" class="btn btn-block btn-primary push-10" v-on:click="exportLive">
                        <i class="fa fa-plus"></i> 导出直播配置 </button> -->
                    <a class="btn btn-block btn-primary push-10" :href="$constant.serverPath + 'live/export?accessToken=' + $mem.state.user.token">
                        <i class="fa fa-plus"></i> 导出直播配置 </a>

                    <button type="button" class="btn btn-block btn-warning push-10" v-on:click="previewLive">
                        <i class="fa fa-refresh"></i> 直播预览 </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>      
export default {
    components: {},
    data: function () {
        return {

        }
    },
    mounted() {

    },

    updated: function () {

    },

    methods: {

        previewLive: function () {
            // $('#modal-add-live').modal('show');
            // live_pre.html?name=' + item.label"
            let _group = this.$mem.state.user.group;
            window.open("live_pre.html?name=" + _group);
        },


        myBrowser: function () {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (isOpera) {
                return "Opera"
            }; //判断是否Opera浏览器
            if (userAgent.indexOf("Firefox") > -1) {
                return "FF";
            } //判断是否Firefox浏览器
            if (userAgent.indexOf("Chrome") > -1) {
                return "Chrome";
            }
            if (userAgent.indexOf("Safari") > -1) {
                return "Safari";
            } //判断是否Safari浏览器
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                return "IE";
            }; //判断是否IE浏览器
            if (userAgent.indexOf("Trident") > -1) {
                return "Edge";
            } //判断是否Edge浏览器
        },
        exportLive: function () {
            let _url = 'live/export?accessToken=' + this.$mem.state.user.token;
            if (this.myBrowser() === "IE" || this.myBrowser() === "Edge") {
                var oPop = window.open("http://124.47.22.86:8080/ggmanager/" + _url, "", "width=1, height=1, top=5000, left=5000");
                for (; oPop.document.readyState != "complete";) {
                    if (oPop.document.readyState == "complete") break;
                }
                oPop.document.execCommand("SaveAs");
                oPop.close();
            } else {
                this.$constant.downloadFile(_url);
            }


            // this.$axios({
            //     method: 'get',
            //     url: 'live/export',
            //     responseType: 'blob'
            // }).then(response => {
            //     this.download(response.data);
            // }).catch((error) => { 
            // })
        },
        download(data) {

            // if (!data) {
            //     return;
            // }
            // console.log(this.$mem.state.user.group);
            // let url = window.URL.createObjectURL(new Blob([data]));
            // let link = document.createElement('a');
            // link.style.display = 'none';
            // link.href = url;
            // link.setAttribute('download', this.$mem.state.user.group + '.conf');

            // document.body.appendChild(link);
            // link.click();
        }
    }
}
</script>
 
<style scoped lang="less">
</style>