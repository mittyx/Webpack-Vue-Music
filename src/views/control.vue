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
        this.$ajax.get('/player/list').then(res => {
            this.$ajax.get('/player/list').then(res => {
                this.$store.state.moduleAudio.songList = res.data.musicListData
                this.$store.dispatch('moduleAudio/start')
            })
        })
    }
}
</script>