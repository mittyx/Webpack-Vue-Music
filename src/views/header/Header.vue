<template>
    <header class="header">
        <svg class="icon" aria-hidden="true" @click="meunShow = true">
            <use xlink:href="#icon-caidan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="daShow()">
            <use xlink:href="#icon-iconfontzhizuobiaozhun22"></use>
        </svg>
        <v-meun v-model="meunShow"></v-meun>
        <div class="shade" v-show="meunShow" @click="meunShow = false;">
        </div>
        <v-search v-model="isShow"></v-search>

    </header>
</template>
<script>
    import Meun from "./Meun";
    import Search from "./Search";
    export default {
        data(){
            return{
               meunShow: false,
               isShow:false
            }
        },
        methods:{
            daShow(){
                this.isShow = true;
                this.$store.state.rollShow = false;
                this.$router.push('/Search')
            }
        },
        components:{
            'v-meun' : Meun,
            'v-search':Search
        }
    }
</script>
