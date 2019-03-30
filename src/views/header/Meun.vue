<template>
    <transition
    name="slides"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutLeft">
        <div class="meun" :value="value" v-if="isShowMeun">
            <div class="personal">
                <img src="../../assets/images/head.png" class="meun-header">
                <div class="meun-info">
                    <div class="userName">灬夏影</div>
                    <i class="icon iconfont icon-ic_userlevel_ levelIcon"></i>
                </div>
            </div>
            <ul class="meunList">
                <li>
                    <i class="icon iconfont icon-wodexiaoxi listIcon"></i>
                    <span>我的消息</span>
                </li>
                <li>
                    <i class="icon iconfont icon-icon-- listIcon"></i>
                    <span>好友列表</span>
                </li>
                <li>
                    <i class="icon iconfont icon-pifuzhuti-xianxing listIcon"></i>
                    <span>个性皮肤</span>
                </li>
                <li>
                    <i class="icon iconfont icon-yejian listIcon"></i>
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
    computed: {
        isShowMeun() {
            return this.value
        }
    },
    watch: {
        value (val) {
            this.$emit('input', val)
        }
    }
}
</script>
