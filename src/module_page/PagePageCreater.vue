<template>

    <div class="row">

        <!-- center -->
        <div class="col-sm-8">
            <div class="block" style="padding: 30px;margin-bottom: 0px;">
                <PageSave ref="modalSave" />

                <div class="block-header">
                    <div class="block-options-simple">
                        <button type="button" class="btn btn-xs btn-primary" v-on:click="addVideoPlayer">
                            <i class="fa fa-plus"></i> 视频源 </button>

                        <button type="button" class="btn btn-xs btn-primary" v-on:click="addImageLoop">
                            <i class="fa fa-plus"></i> 图片轮播 </button>
                        <button type="button" class="btn btn-xs btn-primary" v-on:click="addTextLoop">
                            <i class="fa fa-plus"></i> 文字轮播 </button>

                        <button type="button" class="btn btn-xs btn-warning" v-on:click="reset">
                            <i class="fa fa-check"></i> 重置 </button>
                        <button type="button" class="btn btn-xs btn-success" v-on:click="save">
                            <i class="fa fa-check"></i> 保存 </button>
                    </div>
                    <h3 class="block-title">{{initPageData.name ? initPageData.name :'新页面' }} - 布局</h3>
                </div>

                <div class="block-content" :style="{ backgroundColor:'rgb(250, 250, 210)', padding:'0px 0px 20px',width: maxWidth + 'px', height:  maxHeight  + 'px',  maxWidth: maxWidth + 'px', maxHeight: maxHeight + 'px' }">
                    <div id="pageCreater" class="grid-stack" />
                </div>
            </div>
        </div>
        <!-- center -->

        <div class="col-sm-4">
            <div class="block">
                <div class="block-header">
                    <h3 class="block-title">页面属性</h3>
                </div>
                <div class="block-content">
                    <form class="form-horizontal" onsubmit="return false;">
                        <div class="form-group">
                            <label class="col-xs-4 control-label" for="example-masked-date1">宽度</label>
                            <div class="col-xs-8">
                                <input ref="inputId" class="form-control" type="text" :value="orWidth" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-4 control-label" for="example-masked-date1">高度</label>
                            <div class="col-xs-8">
                                <input ref="inputId" class="form-control" type="text" :value="orHeight" disabled="disabled">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <PagePagePropertyPane ref="pagePagePropertyPane" />
        </div>
    </div>
</template>

<script>     
import Storejs from 'store';
import PagePagePropertyPane from './PagePagePropertyPane.vue';
import PageSave from './PageSave.vue';
export default {
    components: { PagePagePropertyPane, PageSave },
    data: function () {
        let _group = Storejs.get("group");
        if (_group) {
            let _targetWidth = _group.width;
            let _targetHeight = _group.height;

            let _windowWidth = Math.floor((document.body.clientWidth - 230) * 0.666 - 120);
            let _windowHeight = document.body.clientHeight - 230;


            let showWidth = _windowWidth;
            let showHeight = _windowHeight;
            let _targetP = _targetWidth / _targetHeight;
            if (_targetP > 2) {
                _targetP = 2;
            } else if (_targetP < 0.5) {
                _targetP = 0.5;
            }
            if (_targetP >= 1) {
                //横长方形
                showWidth = _windowWidth;
                showHeight = Math.floor(showWidth / _targetP);
                // showHeight = Math.floor(_windowHeight / _gw);

            } else {
                //竖长方形
                showHeight = _windowHeight;
                showWidth = Math.floor(showHeight * _targetP);
            }

            console.log(showWidth + "::" + showHeight);
            return {
                initPageData: {},
                orWidth: _targetWidth,
                orHeight: _targetHeight,
                maxWidth: showWidth,
                maxHeight: showHeight,
            }
        } else {
            let _targetWidth = _group.width;
            let _targetHeight = _group.height;

            let _windowWidth = Math.floor((document.body.clientWidth - 230) * 0.666 - 120);
            let _windowHeight = document.body.clientHeight - 230;

            let showWidth = parseInt(_windowWidth * 0.667);
            let showHeight = parseInt(_windowHeight * 0.667);

            return {
                initPageData: {},
                orWidth: _targetWidth,
                orHeight: _targetHeight,
                maxWidth: showWidth,
                maxHeight: showHeight,
            }
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
        let _this = this;
        this.$axios.get('/account/info').then(function (response) {
            let _info = response.data.group;
            Storejs.set("group", _info);
            _this.$mem.state.groupInfo.width = _info.width;
            _this.$mem.state.groupInfo.height = _info.height;
        }).catch(function (error) {
            toastr.error("获取初始化数据异常 [" + _this.$constant.parseError(error) + "]");
        });

        this.initGridStack();

        let _label = this.$route.params.label;
        if (_label) {
            this.loadPageData(_label);
        } else {
        }

        console.log("init page creater");

        this.$eventHub.$on('gridStackSelectItemChange', function (data) {
            _this.itemSelectChange(data);
        });
        this.$eventHub.$on('gridStackRemoveItem', function (data) {
            // console.log("eventHub gridStackRemoveItem");
            console.log(data.dom);
            var gridstack = $('#pageCreater').data('gridstack');
            gridstack.removeWidget(data.dom);

            this.$mem.commit("removeGridStackItemCustomProperties", data.itemId);

            this.$mem.commit("clearGridStackItemSelected");
            if (this.$refs.pagePagePropertyPane) {
                this.$refs.pagePagePropertyPane.reload();
            }
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
            var items = GridStackUI.Utils.sort(_json);
            let _this = this;
            var gridstack = $('#pageCreater').data('gridstack');

            $('#pageCreater').on('change', function (event, items) {
                if (_this.$refs.pagePagePropertyPane) {
                    _this.$refs.pagePagePropertyPane.reload();
                }
            });

            items.forEach(item => {
                if (item.type == "videoplayer") {
                    gridstack.addWidget($(this.renderVideoPlayer(item.id)),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                        "video": item.video,
                        "camera": item.camera,
                        "width": item.width,
                        "height": item.height,
                    });
                } else if (item.type == "imageloop") {
                    gridstack.addWidget($(this.renderImageloop(item.id)),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                        "interval": item.interval,
                        "direction": item.direction,
                        "images": item.images,
                        "width": item.width,
                        "height": item.height,
                    });
                } else if (item.type == "textloop") {
                    gridstack.addWidget($(this.renderTextloop(item.id)),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                        "texts": item.texts,
                        "width": item.width,
                        "height": item.height,
                    });
                }
            });
        },
        renderVideoPlayer: function (_id) {
            return '<div data-type="videoplayer" id="pn-' + _id +'" data-id="' + _id + '" data-gs-min-width="2" data-gs-min-height="2">'
                + '<div style="left:1px;right:0px;" class="grid-stack-item-content">'
                + '<label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(1)">视'
                + '<button class="gridstack-item-deletebutton" onclick="gridStackRemoveItemCallback(\'' + _id
                + '\')"><i class="si si-close"></i></button></label></div></div>'
        },

        renderImageloop: function (_id) {
            return '<div data-type="imageloop" id="pn-' + _id +'" data-id="' + _id + '" data-gs-min-width="2" data-gs-min-height="2">'
                + '<div style="left:1px;right:0px;" class="grid-stack-item-content">'
                + '<label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(4)">图'
                + '<button class="gridstack-item-deletebutton" onclick="gridStackRemoveItemCallback(\'' + _id
                + '\')"><i class="si si-close"></i></button></label></div></div>'
        },

        renderTextloop: function (_id) {
            return '<div data-type="textloop" id="pn-' + _id +'" data-id="' + _id + '" data-gs-min-width="2" data-gs-min-height="1">'
                + '<div style="left:1px;right:0px;" class="grid-stack-item-content" >'
                + '<label class="btn  btn-primary grid-stack-item-content-button" onclick="gridStackSelectItemCallback(5)">文'
                + '<button class="gridstack-item-deletebutton" onclick="gridStackRemoveItemCallback(\'' + _id
                + '\')"><i class="si si-close"></i></button></label></div></div>'
        },

        itemSelectChange: function (data) {
            //dom   type 
            let _id = data.dom.getAttribute("data-id");
            this.$mem.commit("changeGridStackItemSelected", {
                "name": data.type,
                "dom": data.dom,
                "id": _id
            });
            let _width = data.dom.getAttribute("data-gs-width");
            let _height = data.dom.getAttribute("data-gs-height");

            let _customProperties = this.$mem.state.gridStackAllItemCustomProperties;
            let _pros = _customProperties.get(_id);
            _pros.width = parseInt(_width);
            _pros.height = parseInt(_height);

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
                cellHeight: Math.floor(this.maxHeight / 10) - 1,
                verticalMargin: "1px",
                // disableOneColumnMode :false,
            };
            $('#pageCreater').gridstack(options);
        },

        reset: function () {
            location.reload();
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
            } else {
                toastr.error("页面内容为空无法保存");
            }
        },

        addVideoPlayer: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($(this.renderVideoPlayer(_id)),
                0, 0, 2, 2, true);

            this.$mem.commit("appendGridStackItemCustomProperties", {
                "id": _id,
                "width": 2,
                "height": 2,
            });
        },
        addImageLoop: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($(this.renderImageloop(_id)),
                0, 0, 2, 2, true);

            this.$mem.commit("appendGridStackItemCustomProperties", {
                "id": _id,
                "interval": 3,
                "width": 2,
                "height": 2,
            });
        },
        addTextLoop: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($(this.renderTextloop(_id)),
                0, 0, 2, 1, true);

            this.$mem.commit("appendGridStackItemCustomProperties", {
                "id": _id,
                "width": 2,
                "height": 1,
            });
        },
    }


}
</script>
 
<style scoped lang="less">
</style>