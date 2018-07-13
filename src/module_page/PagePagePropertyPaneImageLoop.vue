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
                <button type="button" style="width: 100%;" class="btn btn-sm btn-primary" v-on:click="showImages">选择图片 </button>
            </div>
        </div>
    </form>
</template>

<script>  

import ImageSelect from './ImageSelect.vue';
export default {
    components: { ImageSelect },
    data: function () {
        return {
            elementId: this.$mem.state.gridStackSelectItem.getAttribute("data-id"),
        }
    },
    methods: {
        getIntervalValue: function () {
            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _gridStackSelectItemId = this.$mem.state.gridStackSelectItemId;
            let customPros = _customProperties.get(_gridStackSelectItemId);
            if (customPros.interval) {
                return customPros.interval;
            } else {
                return "3";
            }
        },
        getDirection: function () {
            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _gridStackSelectItemId = this.$mem.state.gridStackSelectItemId;
            let customPros = _customProperties.get(_gridStackSelectItemId);
            if (customPros.direction) {
                return customPros.direction;
            } else {
                return "h";
            }
        },
        save: function () {
            let _interval = this.$refs.inputInterval.value;
            let _direction = this.$refs.inputDirection.value;

            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _gridStackSelectItemId = this.$mem.state.gridStackSelectItemId;
            let customPros = _customProperties.get(_gridStackSelectItemId);
            if (customPros) {
                customPros.interval = _interval;
                customPros.direction = _direction;
            } else {
                // this.$mem.commit("appendGridStackItemCustomProperties", {
                //     "id": this.$mem.state.gridStackSelectItemId,
                //     "interval": _interval,
                // });
            }

            console.log(_customProperties.get(_gridStackSelectItemId));
        },
        showImages: function () {
            this.$refs.modalImageSelect.setItem();
            $('#modal-imageselect').modal('show');
        }
    }
}
</script>