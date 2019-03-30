<template>
    <transition
        name="slides"
        :enter-active-class="'animated ' + setEnterClass"
        :leave-active-class="'animated ' + setLeaveClass">
        <div class="popup"  v-show="proxyShow" :class="position">
            <div class="pabel">
                <p>{{ title }}</p>
                <div class="list">
                    <div>1</div>
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import _ComponentShow from '../mixins/two-way-show'
export default {
    name: 'popup',
    data() {
        return {
            FADE_IN: {
                top: 'fadeInDown',
                left: 'fadeInLeft',
                right: 'fadeInRight',
                bottom: 'fadeInUp'
            },
            FADE_OUT: {
                top: 'fadeOutUp',
                left: 'fadeOutLeft',
                right: 'fadeOutRight',
                bottom: 'fadeOutDown'
            },
            setEnterClass: null,
            setLeaveClass: null
        }
    },
    props: {
        title: {
            type: String,
            default: '这是一个测试'
        },
        position: {
            type: String,
            default: 'bottom'
        }
    },
    mixins: [_ComponentShow.default],
    watch: {
        proxyShow(val) {
            if (val) {
                this.$shade.add()
            }
        }
    },
    mounted() {
        this.setEnterClass = this.FADE_IN[this.position]
        this.setLeaveClass = this.FADE_OUT[this.position]
        // this.$shade.listen('callback', () => {
        //     this.proxyShow = false
        // })
    }
}
</script>

<style lang="scss" scoped>
@import "./popup.scss"
</style>


