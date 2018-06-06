<template>
    <div class="playSong"  v-show="controlShow">
        <div class="playSong-box">
            <div class="playSong-img" :style="{backgroundImage:'url('+imgUrl+')'}">
            </div>
            <div class="play-header">
                <i class="icon iconfont icon-zuojiantou play-back" @click="controlNoShow"></i>
                <div class="play-info">我是名称123</div>
                <i class="icon iconfont icon-fenxiang play-share"></i>
            </div>
            <div class="play-lrc">
                <ul :style="{transform : transform}" >
                    <li class="lrc-li" v-for="(val,key) in lrcLi.obj" 
                    :data-time="key" 
                    :class="{active:currentLrc(key)}">{{val}}</li>
                </ul>
            </div>
            <div class="play-footer">
                <div class="module-Time" >
                    <time class="playTime" v-html="playTime">00:00</time>
                    <div class="progress-box">
                        <van-slider v-model="value" @change="onChange" />
                    </div>
                    <time class="maxTime" v-html="maxTime">00:00</time>
                </div>
                <div style="height:1.5rem;background:red;" @click.stop = "play"></div>
                </div>
        </div>
    </div>
</template>

<script>
import { myAjax, lrcRegular } from 'root/utils/utils'
export default {
    name: 'v-play',
    data () {
        return {
            audio: {},
            schedule: 0,
            currentTime: '00:00',
            maxTime: '00:00',
            controlShow: false,
            lrcLi: { },
            iconLeft: 0,
            transform: '',
            value: 0,
            imgUrl: require('images/play/background.jpg'),
            musicSrc: require('~/music/yzhaj.mp3')
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.controlShow = true
        })
    },

    methods: {
        onChange(value) {
            if (this.audio.paused) { this.audio.play() }
            this.audio.currentTime = (this.audio.duration * value) / 100
        },
        play () {
            if (this.audio.paused) {
                this.audio.play()
                this.maxTime = this.$options.methods.getTime(parseInt(this.audio.duration))
            } else {
                this.audio.pause()
            }
        },
        getTime (sec) {
            if (sec === '00:00') { return sec }
            let second = sec % 60, minute = Math.floor(sec / 60)
            minute < 10 && (minute = '0' + minute)
            second < 10 && (second = '0' + second)
            return minute + ':' + second
        },
        controlNoShow () {
            this.controlShow = false
            this.$store.state.homeScroll = 'visible'
            this.$router.push({ name: 'Home' })
        },
        currentLrc (time) {
            let index = this.lrcLi.regularTime.findIndex((x) => x == time)
            if (this.playTime < this.lrcLi.regularTime[index + 1] && this.playTime > this.lrcLi.regularTime[index]) {
                this.transform = `translate3d(0,-${index * 0.8}rem,0)`
                return true
            }
            return false
        }
    },
    computed: {
        playTime () {
            return this.getTime(this.currentTime) || '00:00'
        },
        getState () { return this.$store.state.controlShow },
        getValue () { return this.schedule }
    },
    watch: {
        getValue (val) {
            this.value = val
        },
        getState (val) { this.controlShow = val }
    },
    mounted () {
        this.audio = new Audio(this.musicSrc)
        let _this = this
        this.audio.addEventListener('timeupdate', function (e) {
            _this.currentTime = parseInt(this.currentTime)
            _this.schedule = parseInt((this.currentTime / this.duration) * 100)
        })

        // 获取歌词
        myAjax(require('~/music/yzhaj.lrc'), true).then(
            lrc => { return lrcRegular(lrc) } // 获取对象歌词链式调用
        ).then(
            res => {
                this.lrcLi = res
            }
        )
    }
}
</script>

<style lang="scss" >
    
</style>
