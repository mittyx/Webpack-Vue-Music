<template>
    <footer class="control">
        <!-- <router-link :to="{ name: 'player', params: { songId: yzhaj }}">User</router-link> -->
        <div class="cover"><img src="../assets/musicInfo/cover.jpg"/></div>
        <div class="info" @click="playShow">
            <div class="name">{{ curPlaySongName }}</div>
            <div class="singer">{{ curPlaySingerName }}</div>
        </div>
        <div class="cont">
            <i :class="[ paused ?  'icon-icon-5' : 'icon-icon-2', 'icon', 'iconfont']"  @click.stop="playPaused"></i>
            <i class="icon iconfont icon-icon-"></i>
        </div>
    </footer>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState('moduleAudio', [
            'paused'
        ]),
        ...mapGetters('moduleAudio', [
            'curPlaySingerName',
            'curPlaySongName',
        ])
    },
    methods: {
        ...mapMutations('moduleAudio', [
            'playPaused'
        ]),
        playShow() {
            this.$router.push({name: 'player', params: { songId:'yzhaj' }})
        },
        next() {
            this.$store.state.moduleAudio.curPlayIndex = 1
        }
    },
    mounted () {
        this.$ajax.get('http://musicList.cn').then(res => {
            this.$store.state.moduleAudio.songList = res.data.musicListData
            let songSrc = res.data.musicListData[0].src
            // console.log('http://localhost/' + songSrc.substring(2))
            this.$store.state.moduleAudio.audio = new Audio('http://120.79.222.175:80/' + songSrc.substring(2))
            this.$store.state.moduleAudio.audio.load()
            this.$store.dispatch('moduleAudio/getDurTime')
            this.$store.dispatch('moduleAudio/audioEnded')
            this.$store.state.moduleAudio.curPlayIndex = 0
        })
    }
}
</script>