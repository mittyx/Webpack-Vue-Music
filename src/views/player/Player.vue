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
                <ul :style="{ transform : transform }"  ref="lrcUl">
                    <li class="lrc-li" v-for="(val, key) in lrcLi.obj"
                    :data-time="key">{{ val }}</li>
                </ul>
            </div>
            <play-operate></play-operate>
        </div>
    </main>
</template>

<script>
import PlayOperate from './play-operate'
import { myAjax, lrcRegular, formatDate, minTOsec } from 'root/utils/utils'
import { mapGetters, mapState } from 'vuex'
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
        ...mapState('moduleAudio', [
            'audio',
        ]),
        ...mapGetters('moduleAudio', [
            'curPlaySingerName',
            'curPlaySongName',
            'getCurrentTime'
        ])
    },
    methods: {
        homeShow () {
            this.$store.state.homeScroll = 'visible'
            this.$router.push({ name: 'Home' })
        },
        lyricScroll(that) {
            for (let index in this.lrcLi.regularTime) {
                if ( this.getCurrentTime === this.lrcLi.regularTime[index]) {
                    for(let element of this.$refs.lrcUl.children){
                        element.className = ''
                    }
                    this.$refs.lrcUl.children[index].className = 'active'
                    this.transform = `translate3d(0,-${index * 0.8}rem,0)`
                }
            }
        }
    },
    mounted () {
        myAjax(require('~/music/yzhaj.lrc'), true).then(
            lrc => { this.lrcLi = lrcRegular(lrc) } // 获取对象歌词链式调用
        )
        if(this.audio === null) {
            this.$ajax.get('/player/list').then(res => {
                this.$store.state.moduleAudio.songList = res.data.musicListData
                this.$store.dispatch('moduleAudio/start')
                this.$store.dispatch('moduleAudio/audioTimeUpdate', {callback: this.lyricScroll})
            })
        } else{
            this.$store.dispatch('moduleAudio/audioTimeUpdate', {callback: this.lyricScroll})
        }
    }
}
</script>

