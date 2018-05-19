<template>
    <transition name="custom-classes-transition"
                enter-active-class="animated tada"
                leave-active-class="animated bounceOutRight">
        <div class="meun" :value="value" v-show="visible">
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
        props:{
            value:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                visible:false
            }
        },
        watch:{
            value(val){
                this.visible = val;
            },
            visible(val){
                this.$emit('input', val);
            }
        },
        mounted(){
            if(this.value){
                this.visible = true;
            }
        }
    }
</script>

<style scoped>

</style>