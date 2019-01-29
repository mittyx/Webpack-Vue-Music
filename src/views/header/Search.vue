<template>
    <v-transition direction="right" class="search" v-model="showSearchPopup">
        <div class="search-header">
            <div class="out"><i class="icon iconfont icon-47" @click="onCancelBtn"></i></div>
            <div class="input">
                <div class="case">
                    <input name="search" class="inSearch" placeholder="搜索你想要的歌曲" v-model="searchVal" @keyup="searchEnter($event,searchVal)">
                    <ul>
                        <li>{{ searchVal }}</li>
                        <li v-for="item in searchSong">
                            {{ item.songName }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="popular-search">
            <h4 class="title test">热门搜索</h4>
            <div class="popular-search-list" >
                <v-tag v-for="item in hotSearch" @click="onSearchBtn(item.songName)">{{ item.songName }}</v-tag>
            </div>
        </div>
        <div class="history" >
            <ul>
                <li v-for="item in localData">
                    {{ item }}
                </li>
            </ul>
        </div>
    </v-transition>
</template>

<script>
import { song, hot } from 'root/mock/mock.js'
import { LocalStorageCLass } from 'root/utils/utils.js'
import Transition from '_component/transition'
import Tag from '_component/tag'

export default {
    components: {
        'v-transition': Transition,
        'v-tag': Tag
    },
    data () {
        return {
            newLocalStorageCLass: {},
            searchVal: '',
            searchSong: [],
            hotSearch: [],
            localData: []
        }
    },
    watch: {
        searchVal (val) {
            this.$ajax.get('http://song.cn')
                  .then((res) => { this.searchSong = res.data.result })
                  .catch((error) => { console.log(error) })
        }
    },
    computed: {
        showSearchPopup: {
            get() {
                return this.$store.state.showSearchPopup
            },
            set(val) {
                this.$store.state.showSearchPopup = val
            }
        }
    },
    methods: {
        onCancelBtn () {
            this.showSearchPopup = false
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
        this.$ajax.get('http://hot.cn')
            .then((res) => { this.hotSearch = res.data.result })
            .catch((error) => { console.log(error) }
        )
        this.newLocalStorageCLass = new LocalStorageCLass()
        this.localData = this.newLocalStorageCLass.getValue()
    }
}
</script>
<style>
	.test {
    border: .5px solid black;
    border-bottom-width: 4px;
    font-size: 14px;
    line-height: 20px;
    position: relative;
}

</style>