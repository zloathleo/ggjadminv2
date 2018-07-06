<template>
    <div class="block">
        <div class="block-header">
            <ul class="block-options" v-if="$mem.state.gridStackItemSelected != 0">
                <button type="button" class="btn btn-xs btn-primary" v-on:click="save">
                    <i class="fa fa-plus"></i> 保存设置 </button>
            </ul>
            <h3 class="block-title">{{getComName()}}-编辑</h3>
        </div>
        <div class="block-content" v-if="visiable">
            <PagePagePropertyPaneVideo ref="proVideo" v-if="$mem.state.gridStackSelectItemType == 1" :id="$mem.state.gridStackSelectItemId" />
            <PagePagePropertyPaneImageLoop ref="proImageLoop" v-if="$mem.state.gridStackSelectItemType == 4" :id="$mem.state.gridStackSelectItemId" />
            <PagePagePropertyPaneTextLoop ref="proTextLoop" v-if="$mem.state.gridStackSelectItemType == 5" :id="$mem.state.gridStackSelectItemId" />
        </div>
    </div>
</template>

<script>  
import PagePagePropertyPaneVideo from './PagePagePropertyPaneVideo.vue';
import PagePagePropertyPaneImageLoop from './PagePagePropertyPaneImageLoop.vue';
import PagePagePropertyPaneTextLoop from './PagePagePropertyPaneTextLoop.vue';
export default {
    components: { PagePagePropertyPaneVideo, PagePagePropertyPaneImageLoop, PagePagePropertyPaneTextLoop },
    data: function () {
        return {
            visiable: true
        }
    },
    methods: {
        getComName: function () {
            let _s = this.$mem.state.gridStackSelectItemType;
            if (_s == 1) {
                return "视频源";
            } else if (_s == 2) {
                return "图片";
            } else if (_s == 3) {
                return "文字";
            } else if (_s == 4) {
                return "图片轮播";
            } else if (_s == 5) {
                return "文字轮播";
            }
            return "组件"
        },
        save: function () {
            if (this.$mem.state.gridStackSelectItemType == 1) {
                this.$refs.proVideo.save();
            } else if (this.$mem.state.gridStackSelectItemType == 4) {
                this.$refs.proImageLoop.save();
            } else if (this.$mem.state.gridStackSelectItemType == 5) {
                this.$refs.proTextLoop.save();
            }

        },
        reload: function () {
            this.visiable = false;
            this.$nextTick(() => {
                this.visiable = true
            })
        }
    }
}
</script>