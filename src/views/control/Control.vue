<template>
    <footer class="control" @click="trolShow()">
        <!-- <router-link :to="{ name: 'player', params: { songId: yzhaj }}">User</router-link> -->
    </footer>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            trolShow(){
                this.$store.state.controlShow = true;
                this.$store.state.homeScroll = 'hidden';
                this.$router.push({name: 'player', params: { songId:'yzhaj' }})
            }
        }
    }
</script>