<template>
    <footer class="control">
        <!-- <router-link :to="{ name: 'player', params: { songId: yzhaj }}">User</router-link> -->
        <div class="cover"><img src="../assets/musicInfo/cover.jpg"/></div>
        <div class="info" @click="playShow">
            <div class="name">一直很安静</div>
            <div class="singer">阿桑</div>
        </div>
        <div class="cont">
            <i :class="[ $store.state.Xplay ?  'icon-icon-5' : 'icon-icon-2', 'icon', 'iconfont']"  @click.stop = "play"></i>
            <i class="icon iconfont icon-icon-"></i>
        </div>
    </footer>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        playShow () {
            this.$router.push({name: 'player', params: { songId:'yzhaj' }})
        },
        play () {
            this.$store.commit('Mplay')
        }
    }
}
</script>