<template>
    <div class="tag">
        <span @touchstart="onTouchStart"
                @touchend="onTouchEnd">
                <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'tag',
    data() {
        return {
            timeEvent: null
        }
    },
    methods: {
        // 长按事件
        onTouchStart() {
            this.timeEvent = setTimeout(() => {
                console.log('我被触发了')
            }, 800);
        },
        onTouchEnd() {
            clearTimeout(this.timeEvent)
        }
    }
}
</script>
<style lang="scss" scoped>
.tag{
    height: 34px;
    padding: 0 16px;
    background-color: #DCDCDC;
    border-radius:17.5px;
    box-sizing: border-box;
    line-height: 34px;
    text-align: center;
    span{
        font-size: 14px;
    }
}
</style>

