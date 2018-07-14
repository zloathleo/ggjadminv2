<template>
    <div class="block">
        <div class="block-header">
            <div class="block-title">发布地址</div>
        </div>

        <div class="block-content">
            <a :href="publicUrl" target="_blank">
                <p class="content-mini content-mini-full bg-warning" style="color:white;font-weight: bolder;font-size: 1.6rem;">{{publicUrl}}</p>
            </a>
        </div>
    </div>
</template>

<script>        
export default {
    data: function () {
        return {
            publicUrl: 'http://116.62.150.38:8080/server/client.html?group=' + this.$mem.state.user.group
        }
    },
    mounted() {

    },

    methods: {

    }
}
</script>
 
<style scoped lang="less">
</style>