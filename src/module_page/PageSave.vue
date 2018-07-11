<template>

    <div class="modal fade" id="modal-pagesave" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <div class="modal-title">保存该页面</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-xs-4 control-label">页面名称
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.name">
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

</template>

<script>    
export default {
    data: function () {
        return {
            itemData: {
            },
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

            if (!_name.isBlank()) {
                _name = _name.trim(); 

                var params = new URLSearchParams();
                params.append('type', this.itemData.type);
                params.append('name', _name);
                // params.append('startTime', stime);
                // params.append('endTime', etime);

                let _this = this;
                this.$axios.post('pages/add', params).then(function (response) {
                    toastr.success("保存页面成功");
                    // _this.$eventHub.$emit('messages.updated');
                }).catch(function (error) {
                    toastr.error("保存数据异常 [" + _this.$constant.parseError(error) + "]");
                });
            } else {
                toastr.error("页面名称不合法或为空");
            }
        }

    }
}
</script>
 
<style scoped lang="less">
</style>