<template>
    <form class="form-horizontal" onsubmit="return false;">
        <ImageSelect ref="modalImageSelect" />

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">Id</label>
            <div class="col-xs-8">
                <input ref="inputId" class="form-control" type="text" :value="$mem.state.gridStackSelectItemId" disabled="disabled">
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">宽度</label>
            <div class="col-xs-8">
                <input ref="inputId" class="form-control" type="text" :value="getWidthValue()" disabled="disabled">
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">高度</label>
            <div class="col-xs-8">
                <input ref="inputId" class="form-control" type="text" :value="getHeightValue()" disabled="disabled">
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="val-skill">时间间隔</label>
            <div class="col-xs-6">
                <select class="form-control" ref="inputInterval">
                    <option value='3' :selected="getIntervalValue() === '3'">3秒</option>
                    <option value='5' :selected="getIntervalValue() === '5'">5秒</option>
                    <option value='7' :selected="getIntervalValue() === '7'">7秒</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="val-skill">方向</label>
            <div class="col-xs-6">
                <select class="form-control" ref="inputDirection">
                    <option value='h' :selected="getDirection() === 'h'">水平</option>
                    <option value='v' :selected="getDirection() === 'v'">垂直</option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">图片资源</label>
            <div class="col-xs-8">

                <ul class="list-group">
                    <li class="list-group-item active cursor-pointer" style="text-align: center;" v-on:click="showImages">选择图片</li>
                    <li class="list-group-item" v-for="_image in selectedImages">{{_image}}</li>
                </ul>

            </div>
        </div>
    </form>
</template>

<script>  

import ImageSelect from './ImageSelect.vue';
export default {
    components: { ImageSelect },
    data: function () {
        let _elementId = this.$mem.state.gridStackSelectItemId;
        let customPros = this.$mem.state.gridStackAllItemCustomProperties.get(_elementId);

        let _selectedImages = (customPros && customPros.images) ? customPros.images : [];
        return {
            elementId: _elementId,
            selectedImages: _selectedImages,
        }
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
                return parseInt(customPros.height / 10 * this.$mem.state.groupInfo.height);
            } else {
                return 0;
            }
        },
        getIntervalValue: function () {
            let customPros = this.getCustomPros();
            if (customPros.interval) {
                return customPros.interval;
            } else {
                return "3";
            }
        },
        getDirection: function () {
            let customPros = this.getCustomPros();
            if (customPros.direction) {
                return customPros.direction;
            } else {
                return "h";
            }
        },
        save: function () {
            let _interval = this.$refs.inputInterval.value;
            let _direction = this.$refs.inputDirection.value;

            let customPros = this.getCustomPros();
            if (customPros) {
                customPros.interval = _interval;
                customPros.direction = _direction;
            } else {
                // this.$mem.commit("appendGridStackItemCustomProperties", {
                //     "id": this.$mem.state.gridStackSelectItemId,
                //     "interval": _interval,
                // });
            }
            // console.log(_customProperties.get(_gridStackSelectItemId));
        },
        showImages: function () {
            this.$refs.modalImageSelect.setItem();
            $('#modal-imageselect').modal('show');

            let _this = this;
            $('#modal-imageselect').on('hidden.bs.modal', function (e) {
                let customPros = _this.getCustomPros();
                let _images = customPros.images;
                if (_images) {
                    _this.selectedImages = _images;
                } else {
                    _this.selectedImages = [];
                }
            });

        }
    }
}
</script>