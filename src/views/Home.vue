<template>
    <div class="home" :style="{overflowY:homeScroll}">
        <v-header></v-header>
        <v-rolling></v-rolling>
        <v-nav></v-nav>
        <v-Musiclist></v-Musiclist>
        <v-control></v-control>
        <v-info></v-info>
        <v-transition></v-transition>
    </div>
</template>

<script>
import Header from './header/header'
import Rolling from './rolling'
import Nav from './nav'
import MusicList from './musicList/MusicList'
import Control from './control'
import OperationInfo from './operationInfo'
import Transition from './../components/transition'

export default {
    name: 'Home',
    components: {
        'v-header': Header,
        'v-rolling': Rolling,
        'v-nav': Nav,
        'v-Musiclist': MusicList,
        'v-control': Control,
        'v-info': OperationInfo,
        'v-transition': Transition
    },
    data () {
        return {
            homeScroll: 'visible'
        }
    },
    computed: {
        getState () { return this.$store.state.homeScroll }
    },
    watch: {
        getState (val) { this.homeScroll = val }
    },
    mounted() {
    }
}
</script>