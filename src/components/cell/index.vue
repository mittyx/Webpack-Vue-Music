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
    .cell{
        height: 1.5rem;
        box-sizing:border-box;
        width: 100%;
        padding: .1rem;
        display: flex;
        .head {
            height: 1.3rem;
            width: 1.3rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px;
            background-repeat:no-repeat;
            background-size:100% 100%;
        }
        .info{
            display: flex;
            flex-direction: column;
            box-sizing:border-box;
            padding-left: .25rem;
            padding-right: .25rem;
            flex-grow: 1;
            p{  
                line-height: 0.65rem;
                flex-grow: 1;
            }
            .content{
                color: darkgray;
                font-size: 15px;
            }
        }
        .btn{
            height: 1.3rem;
            width: 1.2rem;
            display: flex;
            font-size: 30px;
            align-items: center;
            justify-content: center;
            i{
                font-size: 30px;
                color: darkgray;
            }
        }
    }
</style>
