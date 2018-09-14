<template>
    <div class="block">
        <div class="block-header">
            <div class="block-title">发布地址</div>
        </div>

        <div class="block-content">
            <a :href="'client.html?group=' + $mem.state.user.group" target="_blank">
                <div class="content-mini content-mini-full bg-warning" style="color:white;font-weight: bolder;font-size: 1.6rem;">
                    {{'http://124.47.22.86:8080/server/' + 'client.html?group=' + $mem.state.user.group}}
                </div>
            </a>
        </div>
    </div>
</template>

<script>        
export default {
    data: function () {
        return {
            // publicUrl: 'client.html?group=' + this.$mem.state.user.group
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