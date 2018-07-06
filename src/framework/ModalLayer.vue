<template>

    <div>
        <!-- pagesave Modal -->
        <PageSave />
        <!-- END pagesave Modal -->

        <!-- Image Modal -->
        <ImageSelect />
        <!-- END Image Modal -->

        <!-- videoSelect Modal -->
        <VideoSelect />
        <!-- END videoSelect Modal -->

        <PublicDevice />
        <AddLive />
    </div>

</template>

<script>   
import VideoSelect from './modal/VideoSelect.vue';
import ImageSelect from './modal/ImageSelect.vue';
import PageSave from './modal/PageSave.vue';

import PublicDevice from './modal/PublicDevice.vue';
import AddLive from './modal/AddLive.vue';

export default {
    components: { VideoSelect, ImageSelect, PageSave, PublicDevice, AddLive },
    methods: {

    }

}
</script>
 
<style scoped lang="less">
</style>