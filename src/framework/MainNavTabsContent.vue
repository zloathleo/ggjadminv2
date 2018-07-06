<template>

    <router-view></router-view>

</template>

<script>   

export default {
    name: 'MainNavTabsContent',
    components: {},
    beforeUpdate: function () {
        console.log("beforeUpdate");
    },
    methods: {
        clickOpenTab: function (_event, _link) {
            _event.preventDefault();
            jQuery(_event.target).tab('show');

            this.$router.push({ path: _uidomelement.getAttribute('link') });
        },
        aaa: function (_event) {
            console.log('aaa');
        },
    }

}
</script>
 
<style scoped lang="less">
</style>