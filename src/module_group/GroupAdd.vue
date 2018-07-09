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
                        <div class="modal-title">添加分组</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="example-maxlength1">分组名称
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-md-6">
                                    <input ref="inputName" class="js-maxlength form-control" type="text" maxlength="20">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="val-skill">屏幕类型</label>
                                <div class="col-md-6">
                                    <select ref="inputScreenType" class="form-control">
                                        <option value="1">竖屏</option>
                                        <option value="2">横屏</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="example-maxlength1">屏幕宽度</label>
                                <div class="col-md-6">
                                    <input ref="inputScreenWidth" class="js-maxlength form-control" type="text" maxlength="20">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="example-maxlength1">屏幕高度</label>
                                <div class="col-md-6">
                                    <input ref="inputScreenHeight" class="js-maxlength form-control" type="text" maxlength="20">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label" for="val-skill">维护人员</label>
                                <div class="col-md-6">
                                    <select ref="inputOperator" class="form-control">
                                        <option v-for="(item, index) in tableData" :value="item.label">{{item.label}}</option>
                                    </select>
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
            tableData: [],
        }
    },
    mounted() {
        this.initData();
    },

    methods: {
        initData: function () {
            let _this = this;
            this.$axios.get('/users', {
                params: {
                    filtergroup: true
                }
            }).then(function (response) {
                let _data = response.data;
                if (_data) {
                    _this.tableData = _data.rows;
                }
            }).catch(function (error) {
                toastr.error("操作人员获取异常 [" + error + "]");
            });
        },

        ok: function () {

            let _label = this.$refs.inputName.value;
            let _type = this.$refs.inputScreenType.value;
            let _width = this.$refs.inputScreenWidth.value;
            let _height = this.$refs.inputScreenHeight.value;
            let _operator = this.$refs.inputOperator.value;

            if (_label.isBlank()) {
                toastr.error("输入名称不合法或为空");
                return;
            } 

            var params = new URLSearchParams();
            params.append('label', _label.trim());
            params.append('type', _type);
            params.append('width', _width);
            params.append('height', _height);
            params.append('user', _operator);

            let _this = this;
            this.$axios.post('groups/add', params).then(function (response) {
                toastr.success("添加分组成功");
            }).catch(function (error) {
                toastr.error("添加分组异常 [" + error + "]");
            });

        }
    }
}
</script>
 
<style scoped lang="less">
</style>