<template>
    <div class="block">

        <div class="block-header">
            <h3 class="block-title">直播管理</h3>
        </div>

        <div class="block-content">

            <div class="row" style="padding-bottom: 50px;">

                <div class="col-xs-6 col-xs-offset-3">
                    <button type="button" class="btn btn-block btn-primary push-10" v-on:click="exportLive">
                        <i class="fa fa-plus"></i> 导出直播配置 </button>

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
        },
        exportLive: function () {
            this.$axios({
                method: 'get',
                url: 'live/export',
                responseType: 'blob'
            }).then(response => {
                this.download(response.data);
            }).catch((error) => {

            })
        },
        download(data) {
            if (!data) {
                return;
            }
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', '*.conf');

            document.body.appendChild(link);
            link.click();
        }
    }
}
</script>
 
<style scoped lang="less">
</style>