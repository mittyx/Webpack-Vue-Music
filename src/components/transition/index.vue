<template>
        <transition name="custom-classes-transition"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown" >
	    <div class="fixedFullScreen"  :value="value" v-show="isShow">
	    </div>
        </transition>
</template>

<script>

export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            isShow: false
        }
    },
    watch: {
        value (val) {
            this.isShow = val
        },
        isShow (val) {
            this.$emit('input', val)
        }
    },
    methods: {
    },
    mounted () {
        this.isShow = true
        if (this.value) {
            this.isShow = true
        }
    }
}
</script>
<style lang="scss" scoped>
.fixedFullScreen{
    position:fixed;
	top:0;bottom:0;right:0;left:0;z-index: 3;
	background-color:#fff;
}
</style>
