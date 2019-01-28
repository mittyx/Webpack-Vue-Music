<!--
 * @Description: 全屏动画
 * @Author: hackLi
 * @Date: 2019-01-11 12:49:53
 * @LastEditTime: 2019-01-28 11:12:09
 * @LastEditors: Please set LastEditors
 -->

<template>
    <transition name="custom-classes-transition"
    :enter-active-class="'animated '+ enterDirectionMap[direction]"
    :leave-active-class="'animated '+ leaveDirectionMap[direction]" >
        <div class="fixedFullScreen"  :value="value" v-show="visible">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import visibleMixin from '_component/mixins/visible'
export default {
    mixins: [visibleMixin.default],
    props: {
        direction: {
            validator: function(value) {
                return ['up', 'down', 'left', 'right'].indexOf(value) !== -1
            },
            default: 'up'
        }
    },
    data() {
        return {
            enterDirectionMap: {
                up: 'fadeInUp',
                down: 'fadeInDown',
                left: 'fadeInLeft',
                right: 'fadeInRight'
            },
            leaveDirectionMap: {
                up: 'fadeOutDown',
                down: 'fadeOutUp',
                left: 'fadeOutLeft',
                right: 'fadeOutRight'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.fixedFullScreen{
    position:fixed;
	top:0;bottom:0;right:0;left:0;z-index: 3;
	background-color:#fff;
}
</style>
