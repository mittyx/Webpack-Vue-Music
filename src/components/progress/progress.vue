/* 
 *<music-progress :value="progressValue" @change="onChange">
 *</music-progress>
 */

<template>
  <div class="musicProgress" ref="progress"  @click.stop="onClick($event)">
    <div class="ball" @click.stop="ts($event)" :style="{ transform: 'translate3d('+ progressValue +'px,0,0)' }" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"></div>
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
            progressValue: this.value
        }
    },
    computed: {
        tsValue() {
            return this.value
        }
    },
    watch: {
        tsValue(val) {
            this.progressValue = val
        } 
    },
    methods: {
        onTouchStart(event) {
            this.touchStart(event)
            this.touchMoveFixed = this.progressValue
        },
        onTouchMove(event) {
            this.touchMove(event)
            this.progressValue = this.deltaX + this.touchMoveFixed
            if (this.progressValue < 0) {
                this.progressValue = 0
            }else if(this.progressValue > this.$refs.progress.clientWidth){
                this.progressValue = this.$refs.progress.clientWidth
            }
        },
        onTouchEnd() {
            this.updateValue(this.progressValue, true)
        },
        onClick(e) {
            this.progressValue = e.offsetX
            this.updateValue(this.progressValue, true)
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
$music-progress: 3px;
.musicProgress{
  height: $music-progress;
  width: 100%;
  margin: auto 0;
  background-color: #E6E6E8;
  position: relative;
  .ball{
    position: absolute;
    width: $music-progress*5;height: $music-progress*5;
    top: -($music-progress*5 - $music-progress) / 2;
    left: -($music-progress*5 - $music-progress) / 2;
    border-radius: 100%;
    background-color: white;
    z-index: 2;
    transition: all .05s;
  }
  .cache{
    position: absolute;
    top: 0;
    height: $music-progress;
    background-color: #C0C0C2;
    z-index: 1;
  }
}
</style>
