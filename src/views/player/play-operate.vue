<template>
    <footer class="play-footer">
        <div class="module-Time" >
            <time class="playTime">{{ playTime }}</time>
            <!-- <div class="progress-box">
                <van-slider v-model="value" @change="onChange" />
            </div> -->
            <time class="maxTime">{{ maxTime }}</time>
        </div>
        <div class="module-control">
            <i class="icon iconfont icon-icon-9"></i>
            <i class="icon iconfont icon-icon-4"></i>
            <i :class="[ $store.state.Xplay ?  'icon-icon-5' : 'icon-icon-2', 'icon', 'iconfont']" @click.stop = "play"></i>
            <i class="icon iconfont icon-icon-3" @click.stop = "next"></i>
            <i class="icon iconfont icon-icon-1"></i>
        </div>
        <audio :src=""
    </footer>
</template>

<script>
export default{
    name: 'playerOperate',
    data() {
        return {
            playTime: '00:00',
            currentTime: '00:00',
            maxTime: '00:00',
            schedule: 0,
            value: 0
        }
    }
    // computed: {
    //     isPlay () {
    //         return this.$store.state.Xplay
    //     },

    //     playTime () {
    //         return getSec(this.currentTime) || '00:00'
    //     },

    //     // 双向绑定
    //     getValue () { return this.schedule }
    // },
    // watch: {
    //     isPlay (val) {
    //         !this.$store.state.Xplay ? this.audio.pause() : this.audio.play()
    //     },
    //     getValue (val) {
    //         this.value = val
    //     },
    //     getState (val) { this.controlShow = val }
    // },
    // methods: {
    //     onChange(value) {
    //         if (this.audio.paused) { this.audio.play() }
    //         this.audio.currentTime = (this.audio.duration * value) / 100
    //     },
    //     play () {
    //         this.$store.commit('Mplay')
    //     },
    //     next() {
    //         this.audio.src = require('~/music/広瀬すず - 瑠璃色の地球.mp3')
    //         this.audio.play()
    //     },
    // }
}
</script>
