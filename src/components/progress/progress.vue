/* 
 *<music-progress :value="progressValue" @change="onChange">
 *</music-progress>
 */

<template>
  <div class="musicProgress" id="ls" ref="progress" @click.stop="onClick($event)">
    <div class="ball" @click.stop="ts($event)" :style="{ transform: 'translate3d('+ pxValue +'px,0,0)' }" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"></div>
    <div class="cache" :style="{ width: cacheWidth + '%' }"></div>
  </div>
</template>

<script>
import _touch from '../mixins/touch'
export default {
    name: 'music-progress',
    props: {
        value:{
            type: Number,
            default: 0
        }
    },
    mixins: [_touch.default],
    data() {
        return {
            cacheWidth: 10,
            touchMoveFixed: 0,
            pxValue: 0
        }
    },
    computed: {
        progressValue() {
            return this.value
        }
    },
    watch: {
        progressValue(val) {
            this.pxValue = this.$refs.progress.clientWidth * (val / 100)
        } 
    },
    methods: {
        onTouchStart(event) {
            this.touchStart(event)
            this.touchMoveFixed = this.pxValue
        },
        onTouchMove(event) {
            this.touchMove(event)
            this.pxValue = this.deltaX + this.touchMoveFixed
            if (this.pxValue < 0) {
                this.pxValue = 0
            }else if(this.pxValue > this.$refs.progress.clientWidth){
                this.pxValue = this.$refs.progress.clientWidth
            }
        },
        onTouchEnd() {
            this.updateValue(this.pxValue, true)
        },
        onClick(e) {
            this.pxValue = e.offsetX
            this.updateValue(this.pxValue, true)
        },
        updateValue(value, end) {
            let getVal =  Math.round((value / this.$refs.progress.clientWidth) * 100)
            this.$emit('input', getVal)
            if (end) {
                this.$emit('change', getVal)
            }
        },
        ts(e) {
            // onClick的bug
        }
    }
}
</script>

<style lang="scss">
@import "./progress.scss"
</style>
