<template>
    <div class="songSheel">
    	<ul class="sheel-list" id="sheelId" @scroll.passive="onScroll($event)" v-if="this.$store.state.sheelShow">
            <li v-for="item in sheelData" >
                <span class="sheel-list-span" >
                    <img v-lazy="item.img" alt="122"/>
                    <div class="sheel-name">但愿我和你 是一支唱不完的歌</div>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "songSheel",
        data(){
            return{
                sheelData :[],
                count : 0,
                status : "1"
            }
        },
        methods:{
            onScroll (e) {
                let sheelId = document.getElementById('sheelId') ;
                const bodyW = {
                    sheelTop : document.body.scrollHeight || document.documentElement.scrollHeight,
                    scrollTop : document.body.scrollTop || document.documentElement.scrollTop,
                    innerHeight : document.documentElement.clientHeight || window.innerHeight
                }
                if(Math.ceil(bodyW.scrollTop) +  bodyW.innerHeight == bodyW.sheelTop){
                    axios.post('http://sheel2.cn',{id:1,index:this.$store.state.navNum})
                    .then(res => {this.sheelData = res.data.sheelData;this.status = res.data.status;this.count++;})
                    .catch(error => {console.log(error)});
                }
            }
        },
        mounted(){
            axios.post('http://sheel2.cn',{id:0,index:this.$store.state.navNum})
            .then(res => { this.sheelData = res.data.sheelData})
            .catch(error => {console.log(error)})
            window.addEventListener('scroll', this.onScroll);
        },
        created () {

        },
        destroyed () {
        }
    }
</script>