<template>
    <footer class="play-footer">
        <div class="module-Time" >
            <time class="playTime">{{ getCurTime }}</time>
            <div class="progress-box"></div>
            <music-progress :value="progressValue" @change="onChange"></music-progress>
            <!-- <div class="progress-box">
                <van-slider v-model="value" @change="onChange" />
            </div> -->
            <time class="curTime">{{ getDurTime }}</time>
        </div>
        <div class="module-control">
            <i class="icon iconfont" :class="getPlayMode" @click.stop = "setPlayMode"></i>
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
        ...mapState([
            'paused'
        ]),
        ...mapGetters([
            'getPlayMode'
        ]),
        getCurTime() {
            return formatDate( parseInt(this.$store.state['getCurTime']) )
        },
        getDurTime() {
            return formatDate( parseInt(this.$store.getters['getDurTime']) )
        }
    },
    watch: {
        getCurTime(val) {
           this.progressValue = Math.round( (this.$store.state['getCurTime'] / this.$store.getters['getDurTime']) *100)
        }
    },
    methods: {
        ...mapMutations([
            'playPaused'
        ]),
        ...mapActions([
            'next',
            'prev'
        ]),
        setPlayMode(){
            if(this.$store.state['playMode'] < 2) {
                this.$store.state['playMode']++
            }else {
                this.$store.state['playMode'] = 0
            }
        },
        onChange(value) {
            this.progressValue = value
            this.$store.commit('playCurTime', value)
        }
    }
}
</script>
