<template>
    <header class="header">
        <div class="head">
            <i class="icon iconfont icon-caidan head-icon" @click="onMeunShow()"></i>
            <i class="icon iconfont icon-iconfontzhizuobiaozhun22 head-icon" @click="onSearchShow()"></i>
        </div>
        <v-Meun v-model="headerMeunShow"></v-Meun>
        <transition name="fade">
            <div class="shade shade-background" v-show="headerMeunShow" @click="headerMeunShow = false;"></div>
        </transition>
        <v-Search v-model="headerSearchShow"></v-Search>
    </header>
</template>
<script>
import Meun from "./meun"
import Search from "./search";

export default {
    data () {
        return {
            headerMeunShow: false,
            headerSearchShow: false
        }
    },
    methods: {
        onMeunShow () {
            this.headerMeunShow = true
        },
        onSearchShow () {
            this.headerSearchShow = true
        }
    },
    components: {
        'v-Meun' : Meun,
        'v-Search':Search
    }
}
</script>

