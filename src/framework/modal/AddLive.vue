<template>

    <!-- videoSelect Modal -->
    <div class="modal" id="modal-add-live" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="block block-themed block-transparent remove-margin-b">
                    <div class="block-header bg-primary-dark">
                        <ul class="block-options">
                            <li>
                                <button data-dismiss="modal" type="button">
                                    <i class="si si-close"></i>
                                </button>
                            </li>
                        </ul>
                        <h3 class="block-title">添加直播</h3>
                    </div>
                    <div class="block-content">

                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-xs-4 control-label" for="example-maxlength1">直播名称</label>
                                <div class="col-xs-6">
                                    <input ref="inputName" class="js-maxlength form-control" type="text" maxlength="20">
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-default" type="button" data-dismiss="modal">关闭</button>
                    <button class="btn btn-sm btn-primary" type="button" data-dismiss="modal" v-on:click="ok">
                        <i class="fa fa-check"></i> 确定</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END videoSelect Modal -->

</template>

<script>   

export default {
    data: function () {
        return {

        }
    },

    mounted() {

    },

    methods: {

        ok: function () {
            var params = new URLSearchParams();
            params.append('label', this.$refs.inputName.value);

            let _this = this;
            this.$axios.post('zygl/zb/add', params).then(function (response) { 

                _this.$eventHub.$emit('addLiveDone');

            }).catch(function (error) {

            });

        }
    }
}
</script>
 
<style scoped lang="less">
.active {
  border-color: #2196f3;
  border-width: 2px;
  border-style: solid;
}
</style>