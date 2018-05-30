<template>
    <header class="header">
        <i class="icon iconfont icon-caidan micon" @click="meunShow = true"></i>
        <i class="icon iconfont icon-iconfontzhizuobiaozhun22 micon" @click="daShow()"></i>
    </header>
</template>
<script>
export default {
    data () {
        return {
            meunShow: false,
            isShow: false
        }
    },
    methods: {
        daShow () {
        }
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
.header{
	display: flex;
	justify-content: space-between;
	align-content: center;
	position: fixed;
	top: 0;right:0;left:0;
	height: 1.25rem;
	z-index:1;
	background-color: #fff;
	.micon {
		width: 0.8rem;
		padding :0 0.2875rem;
		vertical-align: -0.025rem;
		fill: #000000;
		overflow: hidden;
	}
}
</style>

