<template>
    <form class="form-horizontal" onsubmit="return false;">
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
            <label class="col-xs-4 control-label" for="example-masked-date1">文字内容</label>
            <div class="col-xs-8">
                <textarea ref="inputTexts" class="form-control" rows="5" placeholder="滚动文字" :value="texts"> </textarea>
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-4 control-label" for="example-masked-date1">文字大小</label>
            <div class="col-xs-8">
                <input ref="inputFontSize" class="form-control" type="text" :value="getFontSizeValue()" >
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
            _texts = cusPros.texts ? cusPros.texts : '';
        }
        return {
            elementId: _elementId,
            texts: _texts,
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
                return parseInt(customPros.height / 20 * this.$mem.state.groupInfo.height);
            } else {
                return 0;
            }
        },
        getFontSizeValue: function () {
            let customPros = this.getCustomPros();
            if (customPros.fontSize) {
                return customPros.fontSize;
            } else {
                return 12;
            }
        },

        save: function () {
            let texts = this.$refs.inputTexts.value;
            let fontSize = this.$refs.inputFontSize.value;
            let customPros = this.getCustomPros();
            if (customPros) {
                customPros.texts = texts;
                customPros.fontSize = parseInt(fontSize);
            }

        }
    }
}
</script>