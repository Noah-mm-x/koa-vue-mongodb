<template>
    <div id="upload">
        <!-- <input
            id="img"
            type="file"
            multiple
            accept="image/*"
        />
        <button @click="upload">点击上传</button> -->
        <Upload
            multiple
            type="drag"
            :on-success="uploadSuccessCallback"
            action="http://localhost:3000/upload"
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
        handleFocus() {
            this.$refs.data.select();
        }
        // upload() {
        //     const apiUrl = "/upload";
        //     const headersConfig = {
        //         "Content-Type": "multipart/form-data"
        //     };
        //     let fileList = document.querySelector("#img").files;
        //     if (!fileList.length) {
        //         this.$Message.error({
        //             content: "图片不能为空",
        //             duration: 2
        //         });
        //         this.loading = false;
        //         return false;
        //     }
        //     let file = fileList[0];
        //     let formData = new FormData();
        //     formData.append("file", file, file.name);
        //     this.$http
        //         .post(apiUrl, formData, {}, headersConfig)
        //         .then(res => {
        //             console.log("red", res);
        //             if (
        //                 res &&
        //                 res.data &&
        //                 res.data.code &&
        //                 res.data.code == 1
        //             ) {
        //                 console.log("111");
        //                 const data = res.data.data;
        //                 this.imgUrl = data.imgUrl;
        //                 console.log("data", data.imgUrl);
        //             } else {
        //                 console.log("22");
        //             }
        //         })
        //         .catch(err => {
        //             console.log("err", err);
        //         });
        // }
    }
};
</script>
<style lang="scss" scoped>
@import "./src/assets/css/common.scss";
</style>


