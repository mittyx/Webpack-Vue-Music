<template>
    <main class="playSong"  v-show="controlShow">
        <div class="playSong-box">
            <div class="playSong-img" :style="{backgroundImage:'url('+imgUrl+')'}">
            </div>
            <header class="play-header">
                <i class="icon iconfont icon-zuojiantou play-back" @click="homeShow"></i>
                <div class="play-info">
                    <div class="name">{{ curPlaySongName }}</div>
                    <div class="singer">{{ curPlaySingerName }}</div>
                </div>
                <i class="icon iconfont icon-fenxiang play-share"></i>
            </header>
            <div class="play-lrc">
                <ul :style="{transform : transform}" >
                    <li class="lrc-li" v-for="(val,key) in lrcLi.obj" 
                    :data-time="key" 
                    :class="{active:currentLrc(key)}">{{val}}</li>
                </ul>
            </div>
            <play-operate></play-operate>
        </div>
    </main>
</template>

<script>
import PlayOperate from './play-operate'
import { myAjax, lrcRegular, getSec } from 'root/utils/utils'
import { mapGetters } from 'vuex'
import { musicList } from 'root/mock/mock'
export default {
    name: 'v-play',
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.controlShow = true
        })
    },
    data () {
        return {
            lrcLi: {},
            controlShow: false,
            transform: '',
            imgUrl: require('images/play/background.jpg')
        }
    },
    components: {
        'play-operate': PlayOperate
    },
    computed: {
        ...mapGetters([
            'curPlaySingerName',
            'curPlaySongName'
        ])
    },
    methods: {
        homeShow () {
            // this.controlShow = false
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
    mounted () {
        // 获取歌词
        myAjax(require('~/music/yzhaj.lrc'), true).then(
            lrc => { this.lrcLi = lrcRegular(lrc) } // 获取对象歌词链式调用
        )
    }
}
</script>

