<template>
    <div id="upload">
        <Upload
            multiple
            type="drag"
            :max-size="2048"
            :on-success="uploadSuccessCallback"
            :on-exceeded-size="exceededSizeCallback"
            action="http://www.mfx55.top/api/upload"
        >
            <div style="padding: 20px 0">
                <Icon
                    type="ios-cloud-upload"
                    size="52"
                    style="color: #3399ff"
                ></Icon>
                <p>点击或拖动文件上传</p>
            </div>
        </Upload>
        <template v-if="imgUrl">
            <img
                :src="imgUrl"
                :alt="imgUrl"
            >
            <input
                ref="data"
                class="ivu-input"
                style="width: 300px,display: block"
                type="text"
                :value="imgUrl"
                @focus="handleFocus"
            >
        </template>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formData: null,
            imgUrl: ""
        };
    },
    mounted() {},
    methods: {
        uploadSuccessCallback(res) {
            if (res && res.code && res.code == 1) {
                const data = res.data;
                this.imgUrl = data.imgUrl;
            } else {
                this.$Message.error({
                    content: res.data.msg,
                    duration: 2
                });
            }
        },
        exceededSizeCallback() {
            this.$Message.error({
                content: "文件过2MB",
                duration: 2
            });
        },
        handleFocus() {
            this.$refs.data.select();
        }
    }
};
</script>
<style lang="scss" scoped>
@import "./src/assets/css/common.scss";
</style>


