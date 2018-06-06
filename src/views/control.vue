<template>
    <footer class="control">
        <!-- <router-link :to="{ name: 'player', params: { songId: yzhaj }}">User</router-link> -->
        <div class="cover"><img src="../assets/musicInfo/cover.jpg"/></div>
        <div class="info" @click="playShow">
            <div class="name">一直很安静</div>
            <div class="singer">阿桑</div>
        </div>
        <div class="cont">
            <i class="icon iconfont icon-bofang"></i>
            <i class="icon iconfont icon-caidan1"></i>
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
        }
    }
}
</script>