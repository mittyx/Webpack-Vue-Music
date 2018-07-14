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
import { myAjax, lrcRegular, formatDate } from 'root/utils/utils'
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
        ...mapState([
            'getCurTime'
        ]),
        ...mapGetters([
            'curPlaySingerName',
            'curPlaySongName'
        ])
    },
    methods: {
        homeShow () {
            this.$store.state.homeScroll = 'visible'
            this.$router.push({ name: 'Home' })
        }
    },
    mounted () {
        // 获取歌词
        myAjax(require('~/music/yzhaj.lrc'), true).then(
            lrc => { this.lrcLi = lrcRegular(lrc) } // 获取对象歌词链式调用
        )
        let _this = this, index = 0;
        this.$store.state.audio.ontimeupdate = function(){
            _this.$store.state.getCurTime = this.currentTime
            if(formatDate(parseInt(this.currentTime)) == _this.lrcLi.regularTime[index] || _this.lrcLi.regularTime[index] == '00:00'){
                if(index != 0){
                    _this.$refs.lrcUl.children[index - 1].className = ''
                    _this.$refs.lrcUl.children[index].className = 'active'
                }
                _this.transform = `translate3d(0,-${index * 0.8}rem,0)`
                index++
            }
        }
    }
}
</script>

