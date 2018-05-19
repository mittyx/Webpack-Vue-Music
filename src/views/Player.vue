<template>
    <div class="playSong"  v-unmove="false" v-show="controlShow">
        <div class="playSong-box">
            <div class="playSong-img" :style="{backgroundImage:'url('+imgUrl+')'}">
            </div>
            <div class="play-header">
                <svg class="icon play-back" aria-hidden="true" @click="controlNoShow">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div class="play-info">我是名称123</div>
                <svg class="icon play-share" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
            <div class="play-lrc">
                <ul :style="{transform : transform}" >
                    <li class="lrc-li" v-for="(val,key) in lrcLi.obj" 
                    :data-time="key" 
                    :class="{active:currentLrc(key,$event)}">{{val}}</li>
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
    import { myAjax,lrcRegular } from '&/utils/utils.js'
    export default {
        name:'v-play',
        data(){
            return{
                audio:{},
                schedule:0,
                currentTime:"00:00",
                maxTime:"00:00",
                controlShow:false,
                lrcLi : {   },
                touch:{},
                iconLeft:0,
                progressWidth:0,
                transform : "",
                imgUrl:require('~/play/background.jpg'),
                musicSrc: require('@/music/一直很安静.mp3')
            }
        },
        beforeRouteEnter (to, from, next){
            next(vm => {
                // 通过 `vm` 访问组件实例
                vm.controlShow = true
            })
        },
        
        methods:{
            play(){
                if(this.audio.paused){
                    this.audio.play();
                    this.maxTime = this.$options.methods.getTime(parseInt(this.audio.duration));
                }else{
                    this.audio.pause()
                }
            },
            getTime(sec){
                if (sec === '00:00'){return sec}
                let second=sec%60,minute=Math.floor(sec/60);
                minute < 10 && (minute = "0"+minute)
                second < 10 && (second = "0"+second)
                return minute+":"+second
            },
            controlNoShow(){
                // this.$store.state.controlShow = false;
                this.controlShow = false
                this.$store.state.homeScroll = 'visible'
                console.log(12)
                this.$router.push({ name: 'Home' })
            },
            currentLrc(time,e){
                let index = this.lrcLi.regularTime.findIndex((x) => x == time);
                if(this.playTime < this.lrcLi.regularTime[index+1] && this.playTime > this.lrcLi.regularTime[index]){
                    this.transform = `translate3d(0,-${index*0.8}rem,0)`
                    return true;
                }
                return false;
            },
             touchStart(){
                if(!this.progressWidth){this.progressWidth =  this.$refs.progress.offsetWidth;}
                if(event.touches.length == 1) {   
                    this.touch.startX = event.touches[0].clientX;
                    console.log(event.touches[0])
                }
            },
            touchMove(){
                if(event.touches.length == 1){
                    let moveX = this.touch.startX-event.touches[0].clientX;
                    this.iconLeft =  `translate3d(${-moveX}px,0,0)`;
                }
            },
            touchEnd(){
            }
        },
        computed:{
            playTime(){
                return this.getTime(this.currentTime) || "00:00";
            },
            getState(){ return this.$store.state.controlShow }
        },
        watch:{
            getState(val){ this.controlShow = val }
        },
        mounted(){
            this.audio = new Audio(this.musicSrc);
            // this.audio.load();
            
            let _this = this
            this.audio.addEventListener('timeupdate',function(e){
               _this.currentTime =  parseInt(this.currentTime) 
               _this.schedule = parseInt((this.currentTime/this.duration)*100)
            })
            // this.progressWidth = document.getElementById('progress');
            // console.log(this.progressWidth.offsetWidth )
            
            
            //获取歌词
             myAjax(require('@/lrc/yzhaj.lrc'),true).then(
                lrc => { return lrcRegular(lrc) } //获取对象歌词链式调用
            ).then(
                res => {
                    this.lrcLi = res;
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
