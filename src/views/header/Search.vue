<template>
    <v-transition direction="right" class="search" :value="showSearchPopup" @change="onChange">
        <div class="search-header">
            <div class="out"><i class="icon iconfont icon-47" @click="onCancelBtn"></i></div>
            <div class="input">
                <div class="case">
                    <input name="search" class="inSearch" placeholder="搜索你想要的歌曲" v-model="searchVal">
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
            <h4 class="title">热门搜索</h4>
            <div class="popular-search-list" >
                <v-tag v-for="item in hotSearch" @click.native="onSearchBtn(item.name)">{{ item.name }}</v-tag>
            </div>
        </div>
        <div class="history">
            <h4 class="title">历史记录</h4>
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
        },
        localData(val) {
            if(val.length > 6) {
                this.localData.length = 6
            }
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
        onSearchBtn(song) {
            let proxy = [...this.localData]
            proxy = new Set(proxy)
            if(proxy.has(song)) {
                proxy.delete(song)
            }
            proxy = [...proxy]
            proxy.unshift(song);
            this.localData = proxy
        },
        onChange(value) {
            if(value) {
                window.localStorage.setStorage('hotSearch', this.localData)
            }
        }
    },
    mounted () {
        let storage = window.localStorage
        this.$ajax.get('/hotSearch')
            .then((res) => { this.hotSearch = res.data.result })
            .catch((error) => { console.log(error) }
        )
        if(!storage.getItem('hotSearch')) {
            storage.setStorage('hotSearch', [])
        }
        // 判断Storage是否为空
        if(storage.getStorage('hotSearch') === "") {
            this.localData = []
        } else {
            this.localData = storage.getStorageArray('hotSearch').reverse();
        }
    }
}
</script>