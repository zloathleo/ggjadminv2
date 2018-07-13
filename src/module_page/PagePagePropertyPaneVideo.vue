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
            <label class="col-xs-4 control-label" for="example-masked-date1">本地视频</label>
            <div class="col-xs-8">
                <button class="btn btn-sm btn-primary" ref="inputVideo" style="width: 100%;" v-on:click="showVideo">
                    选择视频文件
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

        let cusPros = this.$mem.state.gridStackAllItemCustomProperties.get(_elementId);
        let _inputVideoValue = 'NA';
        let _inputCameraValue = 'NA';
        if (cusPros) {
            _inputVideoValue = cusPros.video;
            _inputCameraValue = cusPros.camera;

            if (_inputCameraValue == undefined) {
                _inputCameraValue = 'NA';
            }
        }
        console.log("_inputVideoValue:" + _inputVideoValue + "," + _inputCameraValue);
        return {
            elementId: _elementId,
            inputVideoValue: _inputVideoValue,
            inputCameraValue: _inputCameraValue,
            cameraData: [],
        }
    },

    mounted() {
        // this.initCamera();
    },

    methods: {
        isCameraCheck: function () {
            console.log("isCameraCheck");
            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _gridStackSelectItemId = this.$mem.state.gridStackSelectItemId;
            let customPros = _customProperties.get(_gridStackSelectItemId);
            if (customPros) {
                return customPros.camera;
            }
            return false;
        },
        // initCamera: function () {
        //     let _this = this;
        //     // this.$axios.get('/zygl/zb').then(function (response) {
        //     //     let _data = response.data;
        //     //     if (_data) {
        //     //         _this.cameraData = _data.rows;
        //     //     }
        //     // }).catch(function (error) {
        //     //     console.log(error);
        //     // });
        // },

        save: function () {
            // let id = this.$refs.inputId.value;
            // let video = this.$refs.inputVideo.innerText;
            let camera = this.$refs.inputCamera.checked;

            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _gridStackSelectItemId = this.$mem.state.gridStackSelectItemId;
            let customPros = _customProperties.get(_gridStackSelectItemId);
            if (customPros) {
                customPros.camera = camera;
            } else {
                // this.$mem.commit("appendGridStackItemCustomProperties", {
                //     "id": this.$mem.state.gridStackSelectItemId,
                //     "interval": _interval,
                // });
            }

            console.log(_customProperties.get(_gridStackSelectItemId));

            // if (video == "NA") {
            //     video = undefined;
            // }
            // // if (camera == "NA") {
            // //     camera = undefined;
            // // }
            // // console.log
            // this.$mem.commit("appendGridStackItemCustomProperties", {
            //     "id": id,
            //     "video": video,
            //     "camera": camera,
            // });
        },
        showVideo: function () {
            this.$refs.modalVideoSelect.setItem();
            $('#modal-videoselect').modal('show');
        }
    }
}
</script>