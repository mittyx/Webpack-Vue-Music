<!--
 * @Description: 全屏动画
 * @Author: hackLi
 * @Date: 2019-01-11 12:49:53
 * @LastEditTime: 2019-04-06 17:24:13
 * @LastEditors: Please set LastEditors
 -->

<template>
    <transition name="custom-classes-transition"
    :enter-active-class="'animated '+ enterDirectionMap[direction]"
    :leave-active-class="'animated '+ leaveDirectionMap[direction]">
        <div class="fixedFullScreen" :value="value" v-if="visible">
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
@import "./transition.scss"
</style>
