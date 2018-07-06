<template>

    <div class="modal" id="modal-public-device" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <h3 class="block-title">选择设备</h3>
                    </div>
                    <div class="block-content">
                        <div class="block-content">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 50px;">#</th>
                                        <th class="text-center">设备名称</th>
                                        <th class="text-center" style="width: 30%;">选中</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in $mem.state.modalDeviceList">
                                        <td class="text-center">{{index + 1}}</td>
                                        <td class="text-center">{{item.label}}</td>
                                        <td class="text-center">
                                            <label class="css-input switch switch-sm switch-success">
                                                <input ref="inputCheckbox" :data-label="item.label" type="checkbox" checked="">
                                                <span></span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
            let _nodes = this.$refs['inputCheckbox'];

            _nodes = _nodes.filter(function (v) {
                return v.checked ? true : false;
            });

            let _labels = _nodes.map(function (v) {
                let _label = v.getAttribute("data-label");
                return _label;
            })

            if (_labels && _labels.length > 0) {
                console.log(this.$mem.state.publicPageName);


                var params = new URLSearchParams();
                params.append('label', this.$mem.state.publicPageName);
                params.append('sblist', _labels);

                this.$axios.post('ymgl/publish', params).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });


            }

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