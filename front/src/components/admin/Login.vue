<template>
    <div id="login">
        <div class="wrap">
            <div class="title">admin登录</div>
            <Input
                v-model="name"
                class="input"
                placeholder="请输入名字"
                style="width: 400px"
            >
            <Icon
                type="md-contact"
                slot="prefix"
            />
            </Input>
            <Input
                v-model="pwd"
                type="password"
                class="input"
                placeholder="请输入密码"
                style="width: 400px"
                @on-enter="handleLogin"
            >
            <Icon
                type="md-lock"
                slot="prefix"
            />
            </Input>
            <div class="info">
                还没有账号？
                <router-link
                    to="/adminRegister"
                    tag="a"
                >
                    去注册
                </router-link>
            </div>
            <div class="btn-wrap">
                <Button
                    class="btn"
                    type="primary"
                    size="large"
                    @click="handleLogin"
                >登录</Button>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from "js-md5";
export default {
    data() {
        return {
            name: "",
            pwd: "",
            loading: false
        };
    },
    mounted() {
        console.log("this", this.$route.query.r);
    },
    methods: {
        handleLogin() {
            if (!this.name) {
                this.$Message.error({
                    content: "名字不能为空",
                    duration: 2
                });
                return false;
            }
            if (!this.pwd) {
                this.$Message.error({
                    content: "密码不能为空",
                    duration: 2
                });
                return false;
            }
            this.$store.dispatch("adminUserLogin", {
                name: this.name,
                pwd: this.pwd
            });
            this.handleLink();
        },
        handleLink(){
            if (this.$route.query.r) {
                this.$router.push({
                    path: this.$route.query.r
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "./src/assets/css/common.scss";
$color: #2d8cf0;
#login {
    height: 100%;
}
.wrap {
    width: 400px;
    margin: 0 auto;
    padding-top: 100px;
}
.title {
    position: relative;
    font-size: 24px;
    color: $color;
    text-align: center;
    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 2px;
        margin: auto;
        background: $color;
    }
    &::before {
        left: -154px;
    }
    &::after {
        left: 152px;
    }
}
.input {
    display: block;
    margin: 20px auto;
}
.info {
    width: 400px;
    margin: 0 auto;
    font-size: 13px;
    color: $font-text-color;
}
.btn-wrap {
    @include clearfix;
}
.btn {
    display: block;
    float: right;
}
</style>

