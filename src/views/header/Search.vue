<template>
        <transition name="custom-classes-transition"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown" >
	    <div class="search"  :value="value" v-show="visible">
	        <div class="main">
	        	<svg class="icon" aria-hidden="true" @click="cancel" >
	            	<use xlink:href="#icon-47"></use>
	        	</svg>
	        	<div class="input">
	        		<div class="case">
	        			<input name="search" class="inSearch" placeholder="搜索你想要的歌曲" v-model="searchVal" @keyup="seaEnter($event,searchVal)">
	        			<ul >
	        				<li>{{searchVal}}</li>
	        				<li v-for="item in searchSong">{{ item.songName }}</li>
	        			</ul>
	        		</div>
	        	</div>
	        </div>
	        <div class="hotSea">
	        	<p class="text">热门搜索</p>
	        	<ul class="hotList">
	        		<li v-for="item in hotSea" @click="onSearch(item.songName)">{{ item.songName }}</li>
	        	</ul>
	        </div>
	        <div class="history">
	        	<ul>
                    <li v-for="item in localData">
                        {{ item }}
                    </li>      
                </ul>
	        </div>
	    </div>
        </transition>
</template>

<script>
	import axios from 'axios';
	import { song,hot } from '&/mock/mock.js';
    export default {
    	props:{
    		value:{
    			type:Boolean,
    			default:false
    		}
    	},
    	data(){
            return{
            	visible:false,
            	searchVal:'',
            	searchSong:[],
            	hotSea:[],
            	localData:[]
            }
        },
        watch:{
        	value(val){
        		this.visible = val;
        	},
        	visible(val){
        		this.$emit('input', val);
        	},
        	searchVal(val){
        		axios.get('http://song.cn')
				.then((res) =>{this.searchSong = res.data.result})
				.catch((error)=>{console.log(error)});
        	}
        },
        methods:{
        	cancel(){
        		this.visible = false;
                this.$store.state.rollShow = true;
                this.$router.push('/')
        	},
			arrUp(name,arr,le){
				if(arr.length >= le){
					!~arr.indexOf(name)? (arr.shift(),arr[arr.length]=name)
						:(arr.splice(arr.indexOf(name),1),arr[arr.length]=name)
				}else{arr[arr.length]=name}
			},
        	onSearch(song){
        	    this.$options.methods.arrUp(song,this.localData,6)
        		this.localData = [...new Set(this.localData)]
                localStorage.setItem("localData",JSON.stringify(this.localData))
        	},
        	seaEnter(e,val){
        		if (e.keyCode == 13) {
                    this.$options.methods.arrUp(val,this.localData,6)
                    this.localData = [...new Set(this.localData)]
                    localStorage.setItem("localData",JSON.stringify(this.localData))
        		}
        	}
        },
        mounted() {
		    if (this.value) { this.visible = true }

		    axios.get('http://hot.cn')
				.then((res)=>{this.hotSea = res.data.result})
				.catch((error)=>{console.log(error)});
            let localArr = localStorage.getItem("localData");
            if(localArr === null) {
				localStorage.setItem("localData","[]");
				localArr = localStorage.getItem("localData")}	 
            JSON.parse(localArr).length > 6 && JSON.parse(localArr).splice(5,JSON.parse(localArr).length-5)
        	this.localData = JSON.parse(localArr);
  		}
    }
</script>