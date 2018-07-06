<template>

    <!-- pagesave Modal -->
    <div class="modal" id="modal-pagesave" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
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
                        <h3 class="block-title">{{$mem.state.modal_message_title}}</h3>
                    </div>
                    <div class="block-content">
                        <div class="form-group" style="padding-bottom: 20px;">
                            <label class="col-xs-4" style="padding-top: 7px;" for="example-masked-date1">页面名称</label>
                            <div class="col-xs-8">
                                <input ref="inputPageName" class="form-control" type="text" :value="$mem.state.gridStackPageName" />
                            </div>
                        </div>

                        <pre style="max-height:300px;display: none;">{{$mem.state.modal_message_content}}</pre>

                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-default" type="button" data-dismiss="modal">Close</button>
                    <button class="btn btn-sm btn-primary" type="button" data-dismiss="modal" v-on:click="ok">
                        <i class="fa fa-check"></i> Ok</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END pagesave Modal -->

</template>

<script>   

export default {
    data: function () {
        return {
        }
    },

    mounted() {

    },

    methods: {
        ok: function () {
            let _this = this;

            var params = new URLSearchParams();
            params.append('label', this.$refs.inputPageName.value);
            params.append('content', this.$mem.state.modal_message_content);

            let _label = this.$route.params.label;
            if (_label) {
                //update 
                console.log("update");
                this.$axios.post('ymgl/update', params).then(function (response) {

                }).catch(function (error) {

                });
            } else {
                //create
                console.log("create");
                this.$axios.post('ymgl/add', params).then(function (response) {

                }).catch(function (error) {

                });
            }


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