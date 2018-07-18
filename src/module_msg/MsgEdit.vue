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
                        <div class="modal-title">修改消息</div>
                    </div>
                    <div class="block-content">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-xs-4 control-label" for="val-skill">消息类型</label>
                                <div class="col-xs-6">
                                    <select class="form-control" v-model="itemData.type">
                                        <option value='text'>文字</option>
                                        <option value='sound'>语音</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">消息内容
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="col-xs-6">
                                    <input class="js-maxlength form-control" type="text" maxlength="20" v-model="itemData.name">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">生效时间 </label>
                                <div class="col-xs-6">
                                    <div class="js-datetimepicker js-datetimepicker-edit-start input-group date">
                                        <input id="inputStartTime2" class="form-control" :value="$constant.parseDateTime(itemData.startTime)" type="text" placeholder="选择生效时间..">
                                        <span class="input-group-addon">
                                            <span class="fa fa-calendar"></span>
                                        </span>
                                    </div>

                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-4 control-label">结束时间 </label>
                                <div class="col-xs-6">
                                    <div class="js-datetimepicker input-group date">
                                        <input id="inputEndTime2" class="form-control" :value="$constant.parseDateTime(itemData.endTime)" type="text" placeholder="选择结束时间..">
                                        <span class="input-group-addon">
                                            <span class="fa fa-calendar"></span>
                                        </span>
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
            itemData: {}
        }
    },
    mounted() {

    },

    methods: {
        setItem: function (_item) {
            let _this = this;

            this.$axios.get('/messages/' + _item.label).then(function (response) {
                _this.itemData = response.data;
            }).catch(function (error) {
                toastr.error("获取数据异常 [" + _this.$constant.parseError(error) + "]");
            });
        },

        ok: function () {
            let _label = this.itemData.label;
            let _name = this.itemData.name;
            let _type = this.itemData.type;

            // let _inputStartTime = this.$refs.inputStartTime.value; 
            // let _inputEndTime = this.$refs.inputEndTime.value;


            var stime = $("#inputStartTime2").val();
            var etime = $("#inputEndTime2").val();

            var params = new URLSearchParams();
            params.append('name', _name);
            params.append('type', _type);
            params.append('startTime', stime);
            params.append('endTime', etime);

            let _this = this;
            this.$axios.post('messages/' + _label + '/update', params).then(function (response) {
                toastr.success("修改消息成功");
                // _this.$eventHub.$emit('messages.updated');
            }).catch(function (error) {
                toastr.error("修改数据异常 [" + _this.$constant.parseError(error) + "]");
            });
        }
    }
}
</script>
 
<style scoped lang="less">
</style>