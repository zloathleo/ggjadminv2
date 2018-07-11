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

                        <!-- <button type="button" class="btn btn-xs btn-warning" v-on:click="addImage">
                            <i class="fa fa-plus"></i> 添加图片 </button>
                        <button type="button" class="btn btn-xs btn-warning" v-on:click="addText">
                            <i class="fa fa-plus"></i> 添加文字 </button> -->

                        <button type="button" class="btn btn-xs btn-warning" v-on:click="addImageLoop">
                            <i class="fa fa-plus"></i> 图片轮播 </button>
                        <button type="button" class="btn btn-xs btn-warning" v-on:click="addTextLoop">
                            <i class="fa fa-plus"></i> 文字轮播 </button>

                        <button type="button" class="btn btn-xs btn-success" v-on:click="save">
                            <i class="fa fa-check"></i> 保存 </button>
                    </div>
                    <h3 class="block-title">{{initPageData.name}} - 布局</h3>
                </div>

                <div class="block-content">
                    <div id="pageCreater" class="grid-stack" style="margin-bottom: 20px;">

                    </div>
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
        return {
            initPageData: {}
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

        let _name = this.$route.params.name;
        if (_name) {
            //update
            // this.$mem.commit("changeGridStackPageName", _label)
            this.loadPageData(_name);
        } else {
            //create
            // this.$mem.commit("changeGridStackPageName", "page-" + this.uuid(8, 16));

        }
        // setInterval(this.itemSelectChange, 1000);

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
                    _this.renderPageData(response.data);
                })
                .catch(function (error) {
                    toastr.error("加载数据异常 [" + _this.$constant.parseError(error) + "]");
                });
        },
        renderPageData: function (_data) {
            let _content = _data.content;
            let _json = JSON.parse(_content);

            var items = GridStackUI.Utils.sort(_json);
            let _this = this;
            var gridstack = $('#pageCreater').data('gridstack');
            items.forEach(item => {
                if (item.type == "videoplayer") {
                    gridstack.addWidget($('<div data-type="videoplayer" data-id="' + item.id + '" data-gs-min-width="4" data-gs-min-height="3"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label onclick="gridStackSelectItemCallback(1)" class="btn btn-minw btn-primary grid-stack-item-content-button" >视频源</label></div></div>'),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                        "video": item.video,
                        "camera": item.camera,
                    });
                } else if (item.type == "imageloop") {
                    gridstack.addWidget($('<div data-type="imageloop" data-id="' + item.id + '" data-gs-min-width="4" data-gs-min-height="3"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label onclick="gridStackSelectItemCallback(4)" class="btn btn-minw btn-primary grid-stack-item-content-button" >图片轮播</label></div></div>'),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                    });
                } else if (item.type == "textloop") {
                    gridstack.addWidget($('<div data-type="textloop" data-id="' + item.id + '" data-gs-min-width="4" data-gs-min-height="1"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label onclick="gridStackSelectItemCallback(5)" class="btn btn-minw btn-primary grid-stack-item-content-button" >文字轮播</label></div></div>'),
                        item.x, item.y, item.width, item.height, false);
                    _this.$mem.commit("appendGridStackItemCustomProperties", {
                        "id": item.id,
                        "texts": item.texts
                    });
                }
            });
            console.log(items);
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
            // jQuery('#pageCreater').gridstack();

            var options = {
                float: true,
                alwaysShowResizeHandle: true,
                height: 10,
                width: 12,
                cellHeight: parseInt((document.body.clientHeight - 210) / 10),
                verticalMargin: "1px",
                // disableOneColumnMode :false,
            };

            let _pageCreater = $('#pageCreater');
            _pageCreater.gridstack(options);

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

                // this.$mem.commit("changeModalMessage", {
                //     "title": "保存结果",
                //     "content": _json,
                // });


                this.$refs.modalSave.setItem(this.initPageData);
                $('#modal-pagesave').modal('show');
            }
        },

        addVideoPlayer: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($('<div data-type="videoplayer" data-id="' + _id + '" data-gs-min-width="4" data-gs-min-height="3"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label onclick="gridStackSelectItemCallback(1)" class="btn btn-minw btn-primary grid-stack-item-content-button" >视频源</label></div></div>'),
                0, 0, 4, 3, true);
        },
        // addImage: function () {
        //     var gridstack = $('#pageCreater').data('gridstack');
        //     let _id = this.$constant.uuid(8, 16);
        //     gridstack.addWidget($('<div data-type="image" data-id="' + _id + '" data-gs-min-width="2" data-gs-min-height="2"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label onclick="gridStackSelectItemCallback(2)" class="btn btn-minw btn-primary grid-stack-item-content-button" >图片</label></div></div>'),
        //         0, 0, 2, 2, true);
        // },
        // addText: function () {
        //     var gridstack = $('#pageCreater').data('gridstack');
        //     let _id = this.$constant.uuid(8, 16);
        //     gridstack.addWidget($('<div data-type="text" data-id="' + _id + '" data-gs-min-width="4" data-gs-min-height="1"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label onclick="gridStackSelectItemCallback(3)" class="btn btn-minw btn-primary grid-stack-item-content-button" >文字</label></div></div>'),
        //         0, 0, 4, 1, true);
        // },
        addImageLoop: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($('<div data-type="imageloop" data-id="' + _id + '" data-gs-min-width="4" data-gs-min-height="3"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label onclick="gridStackSelectItemCallback(4)" class="btn btn-minw btn-primary grid-stack-item-content-button" >图片轮播</label></div></div>'),
                0, 0, 4, 3, true);
        },
        addTextLoop: function () {
            var gridstack = $('#pageCreater').data('gridstack');
            let _id = this.$constant.uuid(8, 16);
            gridstack.addWidget($('<div data-type="textloop" data-id="' + _id + '" data-gs-min-width="4" data-gs-min-height="1"><div style="left:1px;right:0px;" class="grid-stack-item-content"> <label onclick="gridStackSelectItemCallback(5)" class="btn btn-minw btn-primary grid-stack-item-content-button" >文字轮播</label></div></div>'),
                0, 0, 4, 1, true);
        },
    }


}
</script>
 
<style scoped lang="less">
</style>