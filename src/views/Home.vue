<template>
    <div class="home" :style="{overflowY:homeScroll}">
        <v-header></v-header>
    </div>
</template>

<script>
    import Header from './header/header';

    export default {
        name: 'Home',
        components: {
            'v-header' : Header
        },
        data(){
            return{
                homeScroll:'visible',
            }
        },
        computed: {
            getState(){ return this.$store.state.homeScroll }
        },
        watch: {
            getState(val){ this.homeScroll = val }
        },
        mounted () {
        }
    }
</script>