<template>

    <div class="modal fade" id="modal-item-add" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <div class="modal-title">添加用户</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="example-maxlength1">消息内容
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-md-6">
                                    <input ref="inputName" class="js-maxlength form-control" type="text" maxlength="20">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="example-maxlength1">生效时间
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-md-6">
                                    <input ref="inputBeginTime" class="js-maxlength form-control" type="text" maxlength="20">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="example-maxlength1">结束时间
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-md-6">
                                    <div class="js-datetimepicker input-group date" data-show-today-button="true" data-show-clear="true" data-show-close="true" data-side-by-side="true">
                                        <input ref="inputEndTime" class="form-control" type="text" placeholder="选择时间" readonly>
                                     </div>
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
        }
    },
    mounted() { 
    },

    methods: { 
        ok: function () {  
            toastr.success("添加用户成功");
        }
    }
}
</script>
 
<style scoped lang="less">
</style>