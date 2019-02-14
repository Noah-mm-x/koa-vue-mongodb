<template>
    <div id="upload">
        <input
            id="img"
            type="file"
            multiple
            accept="image/*"
        />
        <button @click="upload">点击上传</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formData: null
        };
    },
    mounted() {
    },
    methods: {
        upload() {
            const apiUrl = "/upload";
            const headersConfig = {
                "Content-Type": "multipart/form-data"
            };
            let fileList = document.querySelector("#img").files;
            let file = fileList[0];
            let formData = new FormData();
            formData.append("img", file, file.name);
            this.$http
                .post(apiUrl, formData, {}, headersConfig)
                .then(res => {
                    console.log('red',res);
                    if (
                        res &&
                        res.data &&
                        res.data.code &&
                        res.data.code == 1
                    ) {
                        console.log("111");
                    } else {
                        console.log("22");
                    }
                })
                .catch(err => {
                    console.log("err", err);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "./src/assets/css/common.scss";
</style>


