<template>
    <transition 
        name="slides"
        :enter-active-class="'animated ' + setEnterClass"
        :leave-active-class="'animated ' + setLeaveClass">
        <div class="popup"   v-show="proxyShow" :class="position">
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
import _ComponentShow from '../mixins/componentShow'
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
            setLeaveClass: null,
            proxyShow: false
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
        componentShow(val) {
            if(val) {
                this.proxyShow = true
                this.$shade.on(function(params) {
                    this.proxyShow = false
                 }.bind(this))
            }
        }
    },
    mounted() {
        this.setEnterClass = this.FADE_IN[this.position]
        this.setLeaveClass = this.FADE_OUT[this.position]
        if(this.componentShow) {
            this.proxyShow = true
            this.$shade.on(function(params) {
                this.proxyShow = false
            }.bind(this))
        }
    }
}
</script>

<style lang="scss" scoped>
.top{
    top: 0;
    right: 0;
    left: 0;
}
.bottom{
    bottom: 0;
    right: 0;
    left: 0;
}
.right{
    right: 0;
    bottom: 0;
    top: 0;
}
.left{
    left: 0;
    bottom: 0;
    top: 0;
}
.popup{
    display: flex;
    position: fixed;
    z-index: 999;
}
.pabel{
    width: 100%;
    background-color: white;
    padding-left: 10px;
    p{
        height: 40px;
        line-height: 40px;
    }
}
</style>


