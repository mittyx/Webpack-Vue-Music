<template>
    <footer class="play-footer">
        <div class="module-Time" >
            <time class="playTime">{{ getCurrentTime }}</time>
            <div class="progress-box"></div>
            <music-progress :value="progressValue" @change="onChange"></music-progress>
            <!-- <div class="progress-box">
                <van-slider v-model="value" @change="onChange" />
            </div> -->
            <time class="curTime">{{ getDuration }}</time>
        </div>
        <div class="module-control">
            <i class="icon iconfont" :class="setPlayModeIcon" @click.stop="setPlayMode"></i>
            <i class="icon iconfont icon-icon-4" @click.stop = "prev"></i>
            <i :class="[ paused ?  'icon-icon-5' : 'icon-icon-2', 'icon', 'iconfont']" @click.stop = "playPaused"></i>
            <i class="icon iconfont icon-icon-3" @click.stop = "next"></i>
            <i class="icon iconfont icon-icon-1"></i>
        </div>
    </footer>
</template>

<script>
import { formatDate } from 'root/utils/utils'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
export default{
    name: 'playerOperate',
    data() {
        return {
            schedule: 0,
            progressValue: 0
        }
    },
    computed:{
        ...mapState('moduleAudio', [
            'paused',
            'currentTime',
            'duration'
        ]),
        ...mapGetters('moduleAudio', [
            'setPlayModeIcon',
            'getDuration',
            'getCurrentTime'
        ]),
    },
    watch: {
        getCurrentTime(val) {
           this.progressValue = Math.round( (this.currentTime / this.duration) *100)
        }
    },
    methods: {
        ...mapMutations('moduleAudio', [
            'playPaused',
            'setPlayMode'
        ]),
        ...mapActions('moduleAudio', [
            'next',
            'prev'
        ]),
        onChange(value) {
            this.progressValue = value
            this.$store.commit('moduleAudio/playCurTime', value)
        }
    }
}
</script>
