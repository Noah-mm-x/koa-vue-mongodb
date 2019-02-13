<template>
    <div id="index">
        <swiper
            :options="swiperOption"
            class="swiper-wrap"
            ref="mySwiper"
            v-if="banner.length!=0"
        >
            <swiper-slide
                v-for="(item,index) in banner"
                :key="index"
            >
                <img
                    class="img"
                    :src="item.image"
                    alt=""
                />
            </swiper-slide>
            <!-- 常见的小圆点 -->
            <div
                class="swiper-pagination"
                v-for="(item,index) in banner"
                :key="index"
                slot="pagination"
            ></div>
        </swiper>
    </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    data() {
        const _self = this;
        return {
            banner: [
                {
                    image: require("../assets/images/1.jpg")
                },
                {
                    image: require("../assets/images/2.jpg")
                },
                {
                    image: require("../assets/images/3.jpg")
                },
                {
                    image: require("../assets/images/4.jpg")
                }
            ],
            imgIndex: 1,
            swiperOption: {
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                //循环
                loop: true,
                //设定初始化时slide的索引
                initialSlide: 0,
                //自动播放
                autoplay: {
                    delay: 1500,
                    stopOnLastSlide: false,
                    /* 触摸滑动后是否继续轮播 */
                    disableOnInteraction: false
                },
                //滑动速度
                speed: 800,
                //滑动方向
                direction: "horizontal",
                //小手掌抓取滑动
                grabCursor: true,
                on: {
                    //滑动之后回调函数
                    slideChangeTransitionStart() {
                        /* realIndex为滚动到当前的slide索引值 */
                        _self.imgIndex = this.realIndex - 1;
                    }
                },
                //分页器设置
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    type: "bullets"
                }
            }
        };
    },
    components: {
        swiper,
        swiperSlide
    }
};
</script>
<style lang="scss" scoped>
@import "./src/assets/css/common.scss";
#index{
    height: 100%;
}
.swiper-wrap {
    .swiper-slide {
        .img {
            width: rem(375px);
            height: rem(196px);
        }
    }
}
</style>

