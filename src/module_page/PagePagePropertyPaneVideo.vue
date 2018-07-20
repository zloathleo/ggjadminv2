<template>
    <form class="form-horizontal" onsubmit="return false;">
        <VideoSelect ref="modalVideoSelect" />
        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">Id</label>
            <div class="col-xs-8">
                <input ref="inputId" class="form-control" type="text" :value="$mem.state.gridStackSelectItemId" disabled="disabled">
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">宽度</label>
            <div class="col-xs-8">
                <input class="form-control" type="text" :value="getWidthValue()" disabled="disabled">
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">高度</label>
            <div class="col-xs-8">
                <input class="form-control" type="text" :value="getHeightValue()" disabled="disabled">
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">本地视频</label>
            <div class="col-xs-8">
                <button class="btn btn-sm btn-primary" ref="inputVideo" style="width: 100%;" v-on:click="showVideo">
                    {{videobuttomMessage}}
                </button>
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">在线视频</label>
            <div class="col-xs-8">
                <label class="css-input switch switch-sm switch-primary">
                    <input ref="inputCamera" type="checkbox" :checked="isCameraCheck()">
                    <span></span>
                </label>
            </div>
        </div>
    </form>
</template>

<script>  

import VideoSelect from './VideoSelect.vue';
export default {
    components: { VideoSelect },
    data: function () {
        let _elementId = this.$mem.state.gridStackSelectItemId;

        let customPros = this.$mem.state.gridStackAllItemCustomProperties.get(_elementId);
        return {
            elementId: _elementId,
            videobuttomMessage: (customPros && customPros.video) ? customPros.video : '选择视频文件',
        }
    },

    mounted() {
    },

    methods: {
        getCustomPros: function () {
            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _gridStackSelectItemId = this.$mem.state.gridStackSelectItemId;
            return _customProperties.get(_gridStackSelectItemId);
        },
        getWidthValue: function () {
            let customPros = this.getCustomPros();
            if (customPros.width) {
                return parseInt(customPros.width / 12 * this.$mem.state.groupInfo.width);
            } else {
                return 0;
            }
        },
        getHeightValue: function () {
            let customPros = this.getCustomPros();
            if (customPros.height) {
                return parseInt(customPros.height / 20 * this.$mem.state.groupInfo.height);
            } else {
                return 0;
            }
        },

        isCameraCheck: function () {
            let customPros = this.getCustomPros();
            if (customPros) {
                return customPros.camera;
            }
            return false;
        },

        save: function () {
            let camera = this.$refs.inputCamera.checked;

            let customPros = this.getCustomPros();
            if (customPros) {
                customPros.camera = camera;
            } else {
            }

            // console.log(_customProperties.get(_gridStackSelectItemId));

        },
        showVideo: function () {
            this.$refs.modalVideoSelect.setItem();
            $('#modal-videoselect').modal('show');

            let _this = this;
            $('#modal-videoselect').on('hidden.bs.modal', function (e) {
                let customPros = _this.getCustomPros();
                let _video = customPros.video;
                if (_video) {
                    _this.videobuttomMessage = _video;
                } else {
                    _this.videobuttomMessage = '选择视频文件';
                }
            });
        }
    }
}
</script>