<template>
    <div class="songList">
        <div class="wrapper" >
            <ul class="viewport" v-bind:style="{width: viewWidth, transform: transform, transitionDuration: transitionDuration}">
                <li class="item" v-for="item,index in liNum"
                    @touchstart='touchStart(index)'
                    @touchmove='touchMove(index)'
                    @touchend='touchEnd(index)'>
                    <slot v-bind:name="'li'+index">
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import liList from './listTouch'
export default {
    data () {
        return {
            liNum: 4,
            touch: {
                startX: '',
                startY: '',
                endX: '',
                clientWidth: document.body.clientWidth
            },
            transform: '',
            transitionDuration: '500ms',
            viewWidth: '',
            dir: false
        }
    },
    components: {
        'v-list': liList
    },
    computed: {
        getStateNum () {
            return this.$store.state.navNum
        }
    },
    watch: {
        getStateNum (val) {
            this.transform = `translate3d(-${val}00vw,0,0)`
        }
    },
    methods: {
        touchStart (index) {
            this.transitionDuration = '0ms'
            if (event.touches.length == 1) { // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                this.touch.startX = event.touches[0].clientX // 记录开始位置
                this.touch.startY = event.touches[0].clientY
            }
        },
        touchMove (index) {
            if (event.touches.length == 1) {
                let moveS = this.touch.startX - event.touches[0].clientX,
                    moveY = this.touch.startY - event.touches[0].clientY
                if (Math.abs(moveS) > Math.abs(moveY)) {
                    this.dir = true
                    event.preventDefault()
                } else {
                    this.dir = false
                    return false
                }
                let moveX = moveS + (this.touch.clientWidth * index)
                this.transform = `translate3d(-${moveX}px,0,0)`
            }
        },
        touchEnd (index) {
            event.stopPropagation()
            this.transitionDuration = '500ms'
            this.touch.endX = event.changedTouches[0].clientX
            let moveX = this.touch.startX - this.touch.endX
            if (moveX > 0) {
                if (index !== this.liNum - 1) {
                    this.$options.methods.oneSixth.call(this, moveX, index + 1)
                }
                this.transform = "translate3d(-"+index+"00vw,0,0)";
                return
            }
            this.$options.methods.oneSixth.call(this, Math.abs(moveX), index - 1)
            this.transform = "translate3d(-"+index+"00vw,0,0)";
        },
        oneSixth (paramX, operating) {
            if (paramX > this.touch.clientWidth / 6) {
                if(this.dir) {
                    this.$store.state.navNum = operating
                }
            }
        }
    },
    mounted () {
        this.viewWidth = this.liNum + '00vw'
        // console.log(component("ss",List.render));
    }
}
</script>