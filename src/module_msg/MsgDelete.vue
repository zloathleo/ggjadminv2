<template>
    <div class="modal fade" id="modal-item-delete" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="block block-themed block-transparent remove-margin-b">
                    <div class="block-header bg-danger">
                        <ul class="block-options">
                            <li>
                                <button data-dismiss="modal" type="button">
                                    <i class="si si-close"></i>
                                </button>
                            </li>
                        </ul>
                        <div class="modal-title">删除消息</div>
                    </div>
                    <div class="block-content" style="padding-bottom: 20px;">
                        确定删除消息 {{editData?editData.itemLabel:''}} 吗?
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-default" type="button" data-dismiss="modal">关闭</button>
                    <button class="btn btn-sm btn-danger" type="button" data-dismiss="modal" v-on:click="ok">
                        <i class="fa fa-check"></i> 确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>   

export default {
    data: function () {
        return {
            editData: undefined
        }
    },
    mounted() {
    },

    methods: {
        ok: function () {
            let _label = this.editData.itemLabel;
            if (!_label.isBlank()) { 
                let _this = this;
                this.$axios.post('groups/' +_label+ '/delete').then(function (response) {
                    toastr.success("删除消息成功");
                }).catch(function (error) {
                    toastr.error("删除消息组异常 [" + error + "]");
                });
            } else {
                toastr.error("消息名称不合法或为空");
            }
        }
    }
}
</script>
 
<style scoped lang="less">
</style>