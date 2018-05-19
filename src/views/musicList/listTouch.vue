<template>
    <div class="songList">
        <div class="wrapper" >
            <ul class="viewport" v-bind:style="{width : viewWidth ,transform : transform,transitionDuration:transitionDuration}">
                <li class="item" v-for="item,index in liNum"
                    @touchstart='touchStart(index)'
                    @touchmove='touchMove(index)'
                    @touchend='touchEnd(index)'>
                    <slot v-bind:name="'li'+index">
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import liList from "./listTouch"
    export default {
        data(){
            return{
                liNum : 4,
                touch : {
                    startX:"",
                    startY:"",
                    endX:"",
                    clientWidth:document.body.clientWidth
                },
                transform: "",
                transitionDuration:"500ms",
                viewWidth : ""
            }
        },
        components:{
            "v-list" : liList
        },
        computed:{
            getStateNum(){
                return this.$store.state.navNum;
            }
        },
        watch:{
            getStateNum(val){
                this.transform = "translate3d(-"+val+"00vw,0,0)"
            }
        },
        methods:{
            touchStart(index){
                this.transitionDuration = "0ms";
                if(event.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                    this.touch.startX = event.touches[0].clientX; // 记录开始位置
                    this.touch.startY = event.touches[0].clientY;
                }
            },
            touchMove(index){
                if(event.touches.length == 1){
                    let moveS = this.touch.startX-event.touches[0].clientX,
                        moveY = this.touch.startY-event.touches[0].clientY;
                    if(Math.abs(moveS) > Math.abs(moveY)){
                        event.preventDefault()
                    }else {return false}
                    let moveX = moveS + (this.touch.clientWidth*index);
                    this.transform = `translate3d(-${moveX}px,0,0)`;
                }
            },
            touchEnd(index){
                event.stopPropagation();
                this.transitionDuration = "500ms";
                this.touch.endX = event.changedTouches[0].clientX;
                let moveX = this.touch.startX - this.touch.endX;
                if(moveX>0){
                    if(index == 3){
                        this.transform = "translate3d(-"+index+"00vw,0,0)";
                    }else {
                        if(moveX > this.touch.clientWidth/6 ) {
                            this.transform = "translate3d(-"+(index+1)+"00vw,0,0)";
                            this.$store.state.navNum = index+1
                            this.$store.state.navNum == 2 ? this.$store.state.sheelShow = true : this.$store.state.sheelShow = false
                        } else {
                            this.transform = "translate3d(-"+index+"00vw,0,0)"
                        }}
                }else {
                    if(Math.abs(moveX) > this.touch.clientWidth/6 ) {
                        this.transform = "translate3d(-"+(index-1)+"00vw,0,0)";
                        this.$store.state.navNum = index-1;
                        this.$store.state.navNum == 2 ? this.$store.state.sheelShow = true : this.$store.state.sheelShow = false
                    } else {this.transform = "translate3d(-"+index+"00vw,0,0)";};
                }
            }
        },
        mounted(){
            this.viewWidth = this.liNum +"00vw"
            // console.log(component("ss",List.render));
        }
    }
</script>

<style lang="scss">
    .wrapper{
        overflow: hidden;
        .viewport{
            display: flex;
            .item{
                width: 100vw;
            }
        }
    }
</style>