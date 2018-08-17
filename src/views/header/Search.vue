<template>
        <transition name="custom-classes-transition"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown" >
	    <div class="search"  :value="value" v-show="searchShow">
	        <div class="search-header"> 
                <div class="out"><i class="icon iconfont icon-47" @click="onCancelBtn"></i></div>
	        	<div class="input">
	        		<div class="case">
	        			<input name="search" class="inSearch" placeholder="搜索你想要的歌曲" v-model="searchVal" @keyup="searchEnter($event,searchVal)">
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
	        		<li v-for="item in hotSearch" @click="onSearchBtn(item.songName)">{{ item.songName }}</li>
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
import { song, hot } from 'root/mock/mock.js'
import { LocalStorageCLass } from 'root/utils/utils.js'

export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            newLocalStorageCLass: {},
            searchShow: false,
            searchVal: '',
            searchSong: [],
            hotSearch: [],
            localData: []
        }
    },
    watch: {
        value (val) {
            this.searchShow = val
        },
        searchShow (val) {
            this.$emit('input', val)
        },
        searchVal (val) {
            this.$ajax.get('http://song.cn')
                .then((res) => { this.searchSong = res.data.result })
                .catch((error) => { console.log(error) })
        }
    },
    methods: {
        onCancelBtn () {
            this.searchShow = false
            this.$router.push('/')
        },
        showSearchList(val) {
            this.newLocalStorageCLass.addValue(val)
            this.localData = this.newLocalStorageCLass.getValue()
            localStorage.setItem('localData', JSON.stringify(this.localData))
        },
        onSearchBtn (song) {
            this.$options.methods.showSearchList.call(this,song)
        },
        searchEnter (e, val) {
            if (e.keyCode == 13) {
                this.$options.methods.showSearchList.call(this,song)
            }
        }
    },
    mounted () {
        if (this.value) {
            this.searchShow = true
        }
        this.$ajax.get('http://hot.cn')
            .then((res) => { this.hotSearch = res.data.result })
            .catch((error) => { console.log(error) }
        )
        this.newLocalStorageCLass = new LocalStorageCLass()
        this.localData = this.newLocalStorageCLass.getValue()
    }
}
</script>