<template>

    <div class="row">

        <!-- center -->
        <div class="col-sm-8">
            <div class="block">
                <PageSave ref="modalSave" />

                <div class="block-header">
                    <div class="block-options-simple">
                        <button type="button" class="btn btn-xs btn-primary" v-on:click="addVideoPlayer">
                            <i class="fa fa-plus"></i> 视频源 </button>

                        <button type="button" class="btn btn-xs btn-warning" v-on:click="addImageLoop">
                            <i class="fa fa-plus"></i> 图片轮播 </button>
                        <button type="button" class="btn btn-xs btn-warning" v-on:click="addTextLoop">
                            <i class="fa fa-plus"></i> 文字轮播 </button>

                        <button type="button" class="btn btn-xs btn-success" v-on:click="save">
                            <i class="fa fa-check"></i> 保存 </button>
                    </div>
                    <h3 class="block-title">{{initPageData.name ? initPageData.name :'新页面' }} - 布局</h3>
                </div>

                <div class="block-content" :style="{ backgroundColor:'rgb(250, 250, 210)', padding:'0px 0px 20px',width: maxWidth + 'px', height: (maxHeight - 93) + 'px',  maxWidth: maxWidth + 'px', maxHeight: maxHeight + 'px' }">
                    <!-- <div :style="{ width: maxWidth + 'px', height: (maxHeight - 100) + 'px' } " /> -->

                    <div id="pageCreater" class="grid-stack" />
                </div>
            </div>
        </div>
        <!-- center -->

        <div class="col-sm-4">
            <PagePagePropertyPane ref="pagePagePropertyPane" />
        </div>
    </div>
</template>

<script>     
import PagePagePropertyPane from './PagePagePropertyPane.vue';
import PageSave from './PageSave.vue';
export default {
    components: { PagePagePropertyPane, PageSave },
    data: function () {
        let _targetWidth = this.$mem.state.groupInfo.width;
        let _targetHeight = this.$mem.state.groupInfo.height;

        let _windowHeight = document.body.clientHeight - 140;
        let _windowWidth = parseInt(_windowHeight * _targetWidth / _targetHeight);

        console.log(_windowWidth + "::" + _windowHeight);

        return {
            initPageData: {},
            maxWidth: _windowWidth,
            maxHeight: _windowHeight,
        }
    },
    beforeCreate() {
        this.$mem.commit("changeGridStackItemSelected", {
            "name": 0,
            "dom": undefined,
            "id": undefined
        });

        this.$mem.commit("cleanGridStackItemCustomProperties");
    },
    mounted() {
        this.initGridStack();

        let _label = this.$route.params.label;
        if (_label) {
            this.loadPageData(_label);
        } else {
        }

        let _this = this;
        this.$eventHub.$on('gridStackSelectItemChange', function (data) {
            _this.itemSelectChange(data);
        });
    },
    methods: {
        loadPageData: function (_label) {
            let _this = this;
            this.$axios.get('pages/' + _label)
                .then(function (response) {
                    _this.initPageData = response.data;
                    _this.initPageData.update = true;
                    _this.renderPageData(response.data);
                })
                .catch(function (error) {
                    toastr.error("加载数据异常 [" + _this.$constant.parseError(error) + "]");
                });
        },
        renderPageData: function (_data) {
            let _content = _data.content;
            if (!_content) {
                return;
            }
            let _json = JSON.parse(_content);
            console.log(_json);
            var items = GridStackUI.Utils.sort(_json);
            let _this = this;
            var gridstack = $('#pageCreater').data('gridstack');
            items.forEach(item => {
                if (item.type == "videoplayer") {
                    gridstack.addWidget($('<div data-type="videoplayer" data-id="' + item.id + '" data-gs-min-width="2" data-gs-min-height="2"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(1)">视</label></div></div>'),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                        "video": item.video,
                        "camera": item.camera,
                    });
                } else if (item.type == "imageloop") {
                    gridstack.addWidget($('<div data-type="imageloop" data-id="' + item.id + '" data-gs-min-width="2" data-gs-min-height="2"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(4)">图</label></div></div>'),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                        "interval": item.interval,
                        "direction": item.direction,
                        "images": item.images,
                    });
                } else if (item.type == "textloop") {
                    gridstack.addWidget($('<div data-type="textloop" data-id="' + item.id + '" data-gs-min-width="2" data-gs-min-height="1"><div style="left:1px;right:0px;" class="grid-stack-item-content" > <label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(5)">文</label></div></div>'),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                        "texts": item.texts
                    });
                }
            });
        },
        itemSelectChange: function (data) {
            //dom   type 
            let _id = data.dom.getAttribute("data-id");
            this.$mem.commit("changeGridStackItemSelected", {
                "name": data.type,
                "dom": data.dom,
                "id": _id
            });
            if (this.$refs.pagePagePropertyPane) {
                this.$refs.pagePagePropertyPane.reload();
            }
        },

        initGridStack: function () {
            let _h = 10;
            let _w = 12;

            var options = {
                float: true,
                // alwaysShowResizeHandle: true,
                height: _h,
                width: _w,
                // minWidth: this.maxWidth,
                cellHeight: Math.floor(this.maxHeight / 10) - 10,
                verticalMargin: "1px",
                // disableOneColumnMode :false,
            };
            $('#pageCreater').gridstack(options);
        },

        save: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _nodes = gridstack.grid.nodes;
            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            if (_nodes.length > 0) {
                let _allComponents = _nodes.map(function (node, index) {
                    let _dom = node.el[0];
                    let _type = _dom.getAttribute("data-type");
                    let _id = _dom.getAttribute("data-id");
                    let customPros = _customProperties.get(_id);

                    customPros = customPros ? customPros : {};
                    let allPros = Object.assign(customPros, {
                        id: _id,
                        x: node.x,
                        y: node.y,
                        width: node.width,
                        height: node.height,
                        type: _type
                    });
                    return allPros;
                });

                let _json = JSON.stringify(_allComponents, null, '    ');

                console.log(_json);

                this.initPageData.content = _json;

                this.$refs.modalSave.setItem(this.initPageData);
                $('#modal-pagesave').modal('show');
            }
        },

        addVideoPlayer: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($('<div data-type="videoplayer" data-id="' + _id + '" data-gs-min-width="2" data-gs-min-height="2"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(1)">视</label></div></div>'),
                0, 0, 2, 2, true);

            this.$mem.commit("appendGridStackItemCustomProperties", {
                "id": _id
            });
        },
        addImageLoop: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($('<div data-type="imageloop" data-id="' + _id + '" data-gs-min-width="2" data-gs-min-height="2"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(4)">图</label></div></div>'),
                0, 0, 2, 2, true);

            this.$mem.commit("appendGridStackItemCustomProperties", {
                "id": _id
            });
        },
        addTextLoop: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($('<div data-type="textloop" data-id="' + _id + '" data-gs-min-width="2" data-gs-min-height="1"><div style="left:1px;right:0px;" class="grid-stack-item-content" > <label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(5)">文</label></div></div>'),
                0, 0, 2, 1, true);

            this.$mem.commit("appendGridStackItemCustomProperties", {
                "id": _id
            });
        },
    }


}
</script>
 
<style scoped lang="less">
</style>