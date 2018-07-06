<template>
    <form class="form-horizontal" onsubmit="return false;">
        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">Id</label>
            <div class="col-xs-8">
                <input ref="inputId" class="form-control" type="text" :value="$mem.state.gridStackSelectItemId" disabled="disabled">
            </div>
        </div>

        <!-- <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">图片资源</label>
            <div class="col-xs-8">
                <select ref="inputCamera" v-model="inputCameraValue" class="form-control" style="width: 100%;" tabindex="-1" aria-hidden="true">
                    <option value="NA">NA</option>
                    <option v-for="(item, index) in cameraData" :value="item.label">{{item.label}}</option>
                </select>
            </div>
        </div> -->

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">图片资源</label>
            <div class="col-xs-8">
                <button type="button" class="btn btn-xs btn-primary" v-on:click="showImages">
                    <i class="fa fa-plus"></i> 添加图片 </button>

                <ul class="list-group">
                    <li class="list-group-item">图片1</li>
                    <li class="list-group-item">图片2</li>
                    <li class="list-group-item">图片3</li>
                </ul>
            </div>
        </div>
    </form>
</template>

<script>  
export default {
    data: function () {
        return {
            elementId: this.$mem.state.gridStackSelectItem.getAttribute("data-id"),
        }
    },
    methods: {
        save: function () {
            // let id = this.$refs.inputId.value;
            // let video = this.$refs.inputVideo.value;

            // this.$mem.commit("appendGridStackItemCustomProperties", {
            //     "id": id,
            //     "video": video,
            // });
            // console.log("id:" + id);
        },
        showImages: function () {
            // $('#modal-image').modal({
            //     show: true
            // }, {
            //         input: this.$refs.inputVideo
            //     }); 
        }
    }
}
</script>