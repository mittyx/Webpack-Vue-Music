<template>
    <div class="playSong"  v-show="controlShow">
        <div class="playSong-box">
            <div class="playSong-img" :style="{backgroundImage:'url('+imgUrl+')'}">
            </div>
            <div class="play-header">
                <i class="icon iconfont icon-zuojiantou play-back" @click="homeShow"></i>
                <div class="play-info">
                    <div class="name">一直很安静</div>
                    <div class="singer">阿桑</div>
                </div>
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
                <div class="module-control">
                    <i class="icon iconfont icon-icon-9"></i>
                    <i class="icon iconfont icon-icon-4"></i>
                    <i :class="[ $store.state.Xplay ?  'icon-icon-5' : 'icon-icon-2', 'icon', 'iconfont']" @click.stop = "play"></i>
                    <i class="icon iconfont icon-icon-3" @click.stop = "next"></i>
                    <i class="icon iconfont icon-icon-1"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { myAjax, lrcRegular, getSec } from 'root/utils/utils'
import { musicList } from 'root/mock/mock'
export default {
    name: 'v-play',
    data () {
        return {
            audio: {}, lrcLi: {},
            schedule: 0, iconLeft: 0, value: 0,
            currentTime: '00:00', maxTime: '00:00',
            controlShow: false,
            transform: '',
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
            this.$store.commit('Mplay')
        },
        next() {
            this.audio.src = require('~/music/bingyu.mp3')
            this.audio.play()
        },
        homeShow () {
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
        isPlay () {
            return this.$store.state.Xplay
        },

        playTime () {
            return getSec(this.currentTime) || '00:00'
        },

        // 双向绑定
        getState () { return this.$store.state.controlShow },
        getValue () { return this.schedule }
    },
    watch: {
        isPlay (val) {
            !this.audio.paused ? this.audio.pause() : this.audio.play()
        },
        getValue (val) {
            this.value = val
        },
        getState (val) { this.controlShow = val }
    },
    mounted () {
        let _this = this
        this.$ajax.get('http://musicList.cn').then(res => {
            // console.log(res.data.musicListData[0].src)
            _this.audio = new Audio(res.data.musicListData[0].src)
            // 获取歌词
            myAjax(require('~/music/yzhaj.lrc'), true).then(
                lrc => { this.lrcLi = lrcRegular(lrc) } // 获取对象歌词链式调用
            )          
            return _this.audio
        }).then(
            res => {
                res.addEventListener('durationchange', function (e) {
                    _this.maxTime = getSec(parseInt(this.duration))
                })
                return res
            }
        ).then(
            res => {
                res.addEventListener('progress', function (e) {
                    if (this.readyState === 4){
                        console.log(res.buffered, res.buffered.end(0), this.duration)
                        if (this.buffered.end(0) === this.duration){
                            console.log('成功')
                        }
                    }
                })
                return res
            }
        ).then(
            res => {
                res.addEventListener('timeupdate', function (e) {
                    _this.currentTime = parseInt(this.currentTime)
                    _this.schedule = parseInt((this.currentTime / this.duration) * 100)
                })
            }
        )
        .catch((error) => console.log(error))
    }
}
</script>

