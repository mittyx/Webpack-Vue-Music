<template>
    <div class="playSong"  v-show="controlShow">
        <div class="playSong-box">
            <div class="playSong-img" :style="{backgroundImage:'url('+imgUrl+')'}">
            </div>
            <div class="play-header">
                <i class="icon iconfont icon-zuojiantou" @click="controlNoShow"></i>
                <div class="play-info">我是名称123</div>
                <i class="icon iconfont icon-fenxiang"></i>
            </div>
            <div class="play-lrc">
                <ul :style="{transform : transform}" >
                    <li class="lrc-li" v-for="(val,key) in lrcLi.obj" 
                    :data-time="key" 
                    :class="{active:currentLrc(key)}">{{val}}</li>
                </ul>
            </div>
            <div class="play-footer">
                <!-- <myprogress></myprogress> -->
                <!-- <div class="progressts"></div> -->
                <div class="module-Time" >
                    <time class="playTime" v-html="playTime">00:00</time>
                    <div class="progress-box">
                        <progress max="100" value="100" class="progress" ref="progress"></progress>
                        <svg class="icon yuanxk" aria-hidden="true" 
                            @touchstart=touchStart()
                            @touchmove='touchMove()'
                            @touchend='touchEnd()' :style="{transform:iconLeft}">
                            <use xlink:href="#icon-icon-yuanxk"></use>
                        </svg>
                    </div>
                    <time class="maxTime" v-html="maxTime">00:00</time>
                </div>
                
                <!-- <time v-html="playTime">00:00</time>/ -->
                <div style="height:1.5rem;background:red;" @click.stop = "play"></div>
                </div>
        </div>
    </div>
</template>

<script>
import { myAjax, lrcRegular } from 'root/utils/utils'
export default {
      name: 'v-play',
      data () {
          return {
              audio: {},
              schedule: 0,
              currentTime: '00:00',
              maxTime: '00:00',
              controlShow: false,
              lrcLi: { },
              touch: {},
              iconLeft: 0,
              progressWidth: 0,
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
          play () {
              if (this.audio.paused) {
                  this.audio.play()
                  this.maxTime = this.$options.methods.getTime(parseInt(this.audio.duration))
              } else {
                  this.audio.pause()
              }
          },
          getTime (sec) {
              if (sec === '00:00') { return sec }
              let second = sec % 60, minute = Math.floor(sec / 60)
              minute < 10 && (minute = '0' + minute)
              second < 10 && (second = '0' + second)
              return minute + ':' + second
          },
          controlNoShow () {
              // this.$store.state.controlShow = false;
              this.controlShow = false
              this.$store.state.homeScroll = 'visible'
              console.log(12)
              this.$router.push({ name: 'Home' })
          },
          currentLrc (time) {
              let index = this.lrcLi.regularTime.findIndex((x) => x == time)
              if (this.playTime < this.lrcLi.regularTime[index + 1] && this.playTime > this.lrcLi.regularTime[index]) {
                  this.transform = `translate3d(0,-${index * 0.8}rem,0)`
                  return true
              }
              return false
          },
          touchStart () {
              if (!this.progressWidth) { this.progressWidth = this.$refs.progress.offsetWidth }
              if (event.touches.length == 1) {
                  this.touch.startX = event.touches[0].clientX
                  console.log(event.touches[0])
              }
          },
          touchMove () {
              if (event.touches.length == 1) {
                  let moveX = this.touch.startX - event.touches[0].clientX
                  this.iconLeft = `translate3d(${-moveX}px,0,0)`
              }
          },
          touchEnd () {
          }
      },
      computed: {
          playTime () {
              return this.getTime(this.currentTime) || '00:00'
          },
          getState () { return this.$store.state.controlShow }
      },
      watch: {
          getState (val) { this.controlShow = val }
      },
      mounted () {
          this.audio = new Audio(this.musicSrc)
          // this.audio.load();

          let _this = this
          this.audio.addEventListener('timeupdate', function (e) {
              _this.currentTime = parseInt(this.currentTime)
              _this.schedule = parseInt((this.currentTime / this.duration) * 100)
          })
          // this.progressWidth = document.getElementById('progress');
          // console.log(this.progressWidth.offsetWidth )

          // 获取歌词
          myAjax(require('~/music/yzhaj.lrc'), true).then(
              lrc => { return lrcRegular(lrc) } // 获取对象歌词链式调用
          ).then(
              res => {
                  this.lrcLi = res
              // for (let [key,val] of Object.entries(res)) {
              //     console.log(key,val)
              // }
              }
          )
      }
}
</script>

<style lang="scss" >
    
</style>
