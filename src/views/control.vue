<template>
    <footer class="control">
        <!-- <router-link :to="{ name: 'player', params: { songId: yzhaj }}">User</router-link> -->
        <div class="cover"><img src="../assets/musicInfo/cover.jpg"/></div>
        <div class="info" @click="playShow">
            <div class="name">{{ curPlaySongName }}</div>
            <div class="singer">{{ curPlaySingerName }}</div>
        </div>
        <div class="cont">
            <i :class="[ paused ?  'icon-icon-5' : 'icon-icon-2', 'icon', 'iconfont']"  @click.stop = "playPaused"></i>
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
        ...mapState([
            'paused'
        ]),
        ...mapGetters([
            'curPlaySingerName',
            'curPlaySongName',
        ])
    },
    methods: {
        ...mapMutations([
            'playPaused'
        ]),
        playShow () {
            this.$router.push({name: 'player', params: { songId:'yzhaj' }})
        },
        next () {
            this.$store.state.curPlayIndex = 1
        }
    },
    mounted () {
        this.$ajax.get('http://musicList.cn').then(res => {
            let _store = this.$store.state
            _store.songList = res.data.musicListData
            _store.audio = new Audio(res.data.musicListData[0].src)
            _store.audio.load()
            this.$store.dispatch('getDurTime')
            _store.curPlayIndex = 0
        })
    }
}
</script>