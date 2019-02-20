<template>
    <div id="login">
        <div class="wrap">
            <div class="title">登录</div>
            <Input
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
            <div class="info">
                还没有账号？
                <router-link
                    to="/register"
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
                >登录</Button>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "./src/assets/css/common.scss";
$color: #2d8cf0;
#login {
    height: 100%;
}
.wrap {
    width: 400px;
    margin: 100px auto 0;
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
        left: -90px;
    }
    &::after {
        left: 88px;
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

