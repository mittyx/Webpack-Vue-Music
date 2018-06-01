<template>
    <transition 
    name="slides"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutLeft">
        <div class="meun" :value="value" v-show="meunShow">
            <div class="personal">
                <img src="../../assets/images/head.png" class="hair">
                <div class="meData">
                    <div class="nickName">灬夏影</div>
                    <svg class="levelIcon level" aria-hidden="true">
                        <use xlink:href="#icon-ic_userlevel_"></use>
                    </svg>
                </div>
            </div>
            <ul class="meunList">
                <li>
                    <svg class="listIcon" aria-hidden="true">
                        <use xlink:href="#icon-wodexiaoxi"></use>
                    </svg>
                    <span>我的消息</span>
                </li>
                <li>
                    <svg class="listIcon" aria-hidden="true">
                        <use xlink:href="#icon-icon--"></use>
                    </svg>
                    <span>好友列表</span>
                </li>
                <li>
                    <svg class="listIcon" aria-hidden="true">
                        <use xlink:href="#icon-pifuzhuti-xianxing"></use>
                    </svg>
                    <span>个性皮肤</span>
                </li>
                <li>
                    <svg class="listIcon" aria-hidden="true">
                        <use xlink:href="#icon-yejian"></use>
                    </svg>
                    <span>夜间模式</span>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            meunShow: false
        }
    },
    watch: {
        value (val) {
            this.meunShow = val
        },
        meunShow (val) {
            this.$emit('input', val)
        }
    },
    mounted () {
        if (this.value) {
            this.meunShow = true
        }
    }
}
</script>

<style lang="scss" scoped>
.slideInLeft{
    animation: slideInLeft 5s;
}
</style>
