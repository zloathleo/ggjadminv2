<template>
    <form class="form-horizontal" onsubmit="return false;">
        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">Id</label>
            <div class="col-xs-8">
                <input ref="inputId" class="form-control" type="text" :value="$mem.state.gridStackSelectItemId" disabled="disabled">
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">本地视频</label>
            <div class="col-xs-8">
                <button class="btn btn-sm btn-primary" ref="inputVideo" v-on:click="showVideo">
                    {{inputVideoValue ? inputVideoValue : 'NA'}}
                </button>
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">在线视频</label>
            <div class="col-xs-8">
                <select ref="inputCamera" v-model="inputCameraValue" class="form-control" style="width: 100%;" tabindex="-1" aria-hidden="true">
                    <option value="NA">NA</option>
                    <option v-for="(item, index) in cameraData" :value="item.label">{{item.label}}</option>
                </select>
            </div>
        </div>
    </form>
</template>

<script>  
export default {
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
        this.initCamera();
    },

    methods: {
        initCamera: function () {
            let _this = this;
            this.$axios.get('/zygl/zb').then(function (response) {
                let _data = response.data;
                if (_data) {
                    _this.cameraData = _data.rows;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },

        save: function () {
            let id = this.$refs.inputId.value;
            let video = this.$refs.inputVideo.innerText;
            let camera = this.$refs.inputCamera.value;

            if (video == "NA") {
                video = undefined;
            }
            if (camera == "NA") {
                camera = undefined;
            }
            this.$mem.commit("appendGridStackItemCustomProperties", {
                "id": id,
                "video": video,
                "camera": camera,
            });
        },
        showVideo: function () {
            $('#modal-videoSelect').modal({
                show: true
            }, {
                    input: this.$refs.inputVideo
                });
        }
    }
}
</script>