<template>
    <header>
        <div class="head">
            <i class="icon iconfont icon-caidan head-icon" @click="headerMeunShow = true"></i>
            <i class="icon iconfont icon-iconfontzhizuobiaozhun22 head-icon" @click="goSeaShow()"></i>
        </div>
        <v-Meun v-model="headerMeunShow"></v-Meun>
        <div class="shade" v-show="headerMeunShow" @click="headerMeunShow = false;"></div>
    </header>
</template>
<script>
import Meun from "./meun"

export default {
    data () {
        return {
            headerMeunShow: false,
            searchShow: false
        }
    },
    methods: {
        daShow () {
            this.searchShow = true
            this.$store.state.rollShow = false
        }
    },
    components: {
        'v-Meun' : Meun
    }
}
</script>


