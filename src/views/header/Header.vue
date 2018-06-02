<template>
    <header>
        <div class="head">
            <i class="icon iconfont icon-caidan head-icon" @click="goMeunShow()"></i>
            <i class="icon iconfont icon-iconfontzhizuobiaozhun22 head-icon" @click="goSeaShow()"></i>
        </div>
        <v-Meun v-model="headerMeunShow"></v-Meun>
        <transition name="fade">
            <div class="shade" v-show="headerMeunShow" @click="headerMeunShow = false;"></div>
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
        goMeunShow () {
            this.headerMeunShow = true
        },
        goSeaShow () {
            this.headerSearchShow = true
            this.$store.state.rollShow = false;
        }
    },
    components: {
        'v-Meun' : Meun,
        'v-Search':Search
    }
}
</script>

