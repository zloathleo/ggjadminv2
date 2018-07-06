<template>
    <form class="form-horizontal" onsubmit="return false;">
        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">Id</label>
            <div class="col-xs-8">
                <input ref="inputId" class="form-control" type="text" :value="$mem.state.gridStackSelectItemId" disabled="disabled">
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">文字内容</label>
            <div class="col-xs-8">
                <textarea ref="inputTexts" class="form-control" rows="5" placeholder="滚动文字">{{texts}}</textarea>
            </div>
        </div>
    </form>
</template>

<script>  
export default {
    data: function () {
        let _elementId = this.$mem.state.gridStackSelectItemId;

        let cusPros = this.$mem.state.gridStackAllItemCustomProperties.get(_elementId);
        let _texts = ''; 
        if (cusPros) {
            _texts = cusPros.texts; 
        }
        return {
            elementId: _elementId,
            texts: _texts, 
        }
    },
    methods: {
        save: function () {
            let id = this.$refs.inputId.value;
            let texts = this.$refs.inputTexts.value;

            this.$mem.commit("appendGridStackItemCustomProperties", {
                "id": id,
                "texts": texts,
            });
            console.log("id:" + id);
        }
    }
}
</script>