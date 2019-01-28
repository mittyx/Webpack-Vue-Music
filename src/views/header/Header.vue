<template>
    <header class="header">
        <div class="head">
            <i class="icon iconfont icon-caidan head-icon" @click="onMeunShow()"></i>
            <i class="icon iconfont icon-iconfontzhizuobiaozhun22 head-icon" @click="onSearchPopup()"></i>
        </div>
        <v-Meun v-model="headerMeunShow"></v-Meun>
        <transition name="fade">
            <div class="shade shade-background" v-show="headerMeunShow" @click="headerMeunShow = false;"></div>
        </transition>
        <v-Search></v-Search>
    </header>
</template>
<script>
import Meun from "./meun"
import Search from "./search";

export default {
    data () {
        return {
            headerMeunShow: false
        }
    },
    methods: {
        onMeunShow () {
            this.headerMeunShow = true
        },
        onSearchPopup () {
            this.$store.state.showSearchPopup = true
        }
    },
    components: {
        'v-Meun' : Meun,
        'v-Search': Search
    }
}
</script>

