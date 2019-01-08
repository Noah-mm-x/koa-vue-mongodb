<template>
    <div id="index">
        <div class="txt">这是首页</div>
    </div>
</template>
<script>
import { getARPGGamesData } from "../lib/api";
export default {
    mounted(){
        // const {data} = await getARPGGamesData()
        // console.log('data',getARPGGamesData());
        // getARPGGamesData().then(res=>{
        //     console.log('res',res);
        // })
        this.getData();
    },
    methods: {
        async getData(){
            let re = await getARPGGamesData();
            console.log('re',re);
            return re
        }
    }
}
</script>
<style lang="scss" scoped>
$color: red;
.txt{
    color: $color;
}
</style>

