<template>
    <div class="cell">
        <div class="head" :style="{backgroundImage: 'url('+ background +')'}">{{ count }}</div>
        <div class="info">
            <p class="title">{{ title }}</p>
            <p class="content">{{ content }}</p>
        </div>
        <div class="btn" @click.stop="onClick"><i class="icon iconfont icon-gengduo2"></i></div>
    </div>
</template>

<script>
export default {
    name: 'my-cell',
    props: {
        title: {
            type: String,
            default: '吻别'
        },
        content: {
            type: String,
            default: '张学友'
        },
        count: {
            type: Number,
            default: null
        },
        background:{
            type: String,
            default: ''
        },
        obj: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {}
    },
    methods: {
        onClick () {
            this.$emit('btnClick',this.obj);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "./cell.scss"
</style>
