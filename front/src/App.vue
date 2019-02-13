<template>
    <div id="app">
        <public-header></public-header>
        <router-view />
    </div>
</template>

<script>
import publicHeader from "../src/components/common/Header";
export default {
    name: "App",
    components:{
        publicHeader
    }
};
</script>

<style lang="scss">
#app {
    background: #f2f2f3; 
}
</style>
<style lang="scss">
@import "./src/assets/css/common.scss";
</style>

