<template>
    <div class="home" :style="{overflowY:homeScroll}">
        <v-header></v-header>
        <v-rolling></v-rolling>
        <v-nav></v-nav>
        <v-Musiclist></v-Musiclist>
    </div>
</template>

<script>
import Header from './header/header'
import Rolling from './rolling'
import Nav from './nav'
import MusicList from './musicList/MusicList';

  export default {
      name: 'Home',
      components: {
          'v-header': Header,
          'v-rolling': Rolling,
          'v-nav': Nav,
          'v-Musiclist': MusicList
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
      mounted () {
      }
  }
</script>