<template>
    <div id="app">
        <public-header v-if="!isAdmin"></public-header>
        <router-view />
    </div>
</template>

<script>
import publicHeader from "../src/components/common/Header";
export default {
    name: "App",
    mounted(){
    },  
    computed:{
        isAdmin(){
            return this.$route.name.indexOf('Admin')!=-1
        }
    },
    components:{
        publicHeader
    }
};
</script>

<style lang="scss">
#app {
    height: 100%;
    background: #f2f2f3; 
}
</style>
<style lang="scss">
@import "./src/assets/css/common.scss";
</style>

