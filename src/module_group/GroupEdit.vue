<template>

    <div class="modal fade" id="modal-item-edit" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <div class="modal-title">编辑分组</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-xs-4 control-label">分组名称
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" readonly v-model="itemData.name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">屏幕类型</label>
                                <div class="col-xs-6">
                                    <select class="form-control" v-model="itemData.type">
                                        <option value=1>竖屏</option>
                                        <option value=2>横屏</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">屏幕宽度</label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.width">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">屏幕高度</label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.height">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">维护人员</label>
                                <div class="col-xs-6">
                                    <select class="form-control" v-model="itemData.user">
                                        <option v-for="(item, index) in tableData" :value="item.name">{{item.name}}</option>
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
            itemData: {},
            tableData: [],
        }
    },
    mounted() {
    },
    updated() {
        console.log(123);
    },

    methods: {
        setItem: function (_item) {
            let _this = this;

            this.$axios.get('/groups/' + _item.label).then(function (response) {
                let _data = response.data;
                _this.itemData = _data;
            }).catch(function (error) {
                toastr.error("获取数据异常 [" + _this.$constant.parseError(error) + "]");
            });

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
                toastr.error("获取数据异常 [" + _this.$constant.parseError(error) + "]");
            });
        },

        ok: function () {

            let _label = this.itemData.label;
            let _type = this.itemData.type;
            let _width = this.itemData.width;
            let _height = this.itemData.height;
            let _operator = this.itemData.user;

            var params = new URLSearchParams();
            params.append('type', _type);
            params.append('width', _width);
            params.append('height', _height);
            params.append('user', _operator);

            let _this = this;
            this.$axios.post('groups/' + _label + '/update', params).then(function (response) {
                toastr.success("修改分组成功");
                _this.$eventHub.$emit('groups.updated');
            }).catch(function (error) {
                toastr.error("修改数据异常 [" + _this.$constant.parseError(error) + "]");
            });


        }
    }
}
</script>
 
<style scoped lang="less">
</style>