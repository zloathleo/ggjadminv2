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
                        <div class="modal-title">删除用户</div>
                    </div>
                    <div class="block-content" style="padding-bottom: 20px;">
                        确定删除用户 {{itemData.name}} 吗?
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
            itemData: {}
        }
    },
    mounted() {
    },

    methods: {
        setItem: function (_item) {
            this.itemData = _item;
        },
        ok: function () {
            let _name = this.itemData.name;
            if (_name && !_name.isBlank()) {
                let _this = this;
                this.$axios.post('users/' + _name + '/delete').then(function (response) {
                    toastr.success("删除用户成功");
                    _this.$eventHub.$emit('users.updated');
                }).catch(function (error) {
                    toastr.error("删除数据异常 [" + _this.$constant.parseError(error) + "]");
                });
            } else {
                toastr.error("用户名不合法或为空");
            }
        }
    }
}
</script>
 
<style scoped lang="less">
</style>