<template>
    <div id="register">
        <div class="wrap">
            <div class="title">admin注册</div>
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
            >
            <Icon
                type="md-lock"
                slot="prefix"
            />
            </Input>
            <Input
                v-model="repwd"
                type="password"
                class="input"
                placeholder="确认密码"
                style="width: 400px"
            >
            <Icon
                type="md-lock"
                slot="prefix"
            />
            </Input>
            <div class="info">
                已经有账号了？
                <router-link
                    to="/adminLogin"
                    tag="a"
                >
                    去登录
                </router-link>
            </div>
            <div class="btn-wrap">
                <Button
                    class="btn"
                    type="primary"
                    size="large"
                    @click="handleRegister"
                >注册</Button>
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
            repwd: "",
            loading: false
        };
    },
    methods: {
        handleRegister() {
            if (this.loading) return false;
            this.loading = true;
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
            if (!this.repwd) {
                this.$Message.error({
                    content: "确认密码不能为空",
                    duration: 2
                });
                return false;
            }
            if(this.pwd != this.repwd){
                this.$Message.error({
                    content: "两个密码不一致",
                    duration: 2
                });
                return false;
            }

            const apiUrl = "/adminRegister";
            const params = {
                name: this.name,
                pwd: md5(this.pwd)
            };
            this.$http
                .post(apiUrl, params)
                .then(res => {
                    if (
                        res &&
                        res.data &&
                        res.data.code &&
                        res.data.code == 1
                    ) {
                        this.loading = false;
                        this.$Message.success({
                            content: "注册成功"
                        });
                    } else {
                        this.loading = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
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


