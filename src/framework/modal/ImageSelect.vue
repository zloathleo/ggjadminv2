<template>

    <!-- videoSelect Modal -->
    <div class="modal" id="modal-image" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="block block-themed block-transparent remove-margin-b">
                    <div class="block-header bg-primary-dark">
                        <ul class="block-options">
                            <li>
                                <button data-dismiss="modal" type="button">
                                    <i class="si si-close"></i>
                                </button>
                            </li>
                        </ul>
                        <h3 class="block-title">选择图片</h3>
                    </div>
                    <div class="block-content">
                        <div class="block-content">
                            <div class="row items-push" v-on:click="selectItem">

                                <div class="col-sm-3 col-md-2 col-lg-2 animated fadeIn" v-for="(item, index) in tableData" v-bind:class="{ active: isItemActive(item) }">
                                    <img style="cursor: pointer" class="img-responsive" :data-id="item.id" :data-label="item.label" :src="$axios.defaults.baseURL + 'ggmanager_resources/' + item.preview" alt="">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-default" type="button" data-dismiss="modal">关闭</button>
                    <button class="btn btn-sm btn-primary" type="button" data-dismiss="modal" v-on:click="ok">
                        <i class="fa fa-check"></i> 确定</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END videoSelect Modal -->

</template>

<script>   

export default {
    data: function () {
        return {
            tableData: [],
            selectItemId: undefined,
            selectItemLabel: undefined,
            sourceInput: undefined,
        }
    },

    mounted() {
        this.initVideos();

        let _this = this;
        $('#modal-videoSelect').on('show.bs.modal', function (e) {
            _this.sourceInput = e.relatedTarget.input;
        })
    },

    methods: {
        initVideos: function () {
            let _this = this;
            this.$axios.get('zygl/zy', {
                params: {
                    type: "video"
                }
            }).then(function (response) {
                let _data = response.data;
                if (_data) {
                    _this.tableData = _data.rows;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        selectItem: function (_event) {
            let item = _event.target;
            let videoId = item.getAttribute("data-id");
            let videoLabel = item.getAttribute("data-label");
            if (item.tagName === "IMG" && videoId && videoLabel) {
                this.selectItemId = videoId;
                this.selectItemLabel = videoLabel;
            }

        },
        isItemActive: function (_item) {
            if (_item.id == this.selectItemId) {
                return true;
            }
            return false;
        },
        ok: function () {
            this.sourceInput.innerText = this.selectItemLabel;
        }
    }
}
</script>
 
<style scoped lang="less">
.active {
  border-color: #2196f3;
  border-width: 2px;
  border-style: solid;
}
</style>