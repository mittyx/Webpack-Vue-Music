<template>
    <component @touchstart="onTouchStart"
                @touchend="onTouchEnd"
                @click="handleClickLink"
                :is="tagName"
                :class="classes">
        <slot></slot>
    </component>
</template>

<script>
import mixinsLink from '_component/mixins/link'

const prefixCls = 'v-btn'

export default {
    name: 'tag',
    data() {
        return {
            timeEvent: null
        }
    },
    mixins: [ mixinsLink ],
    props: {

    },
    computed: {
        // Point out if it should render as <a> tag
        isHrefPattern() {
            const {to} = this;
            return !!to;
        },
        tagName() {
            const {isHrefPattern} = this;
            return isHrefPattern ? 'a' : 'button'
        },
        classes() {
            return [
                `{$prefixCls}`
            ]
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
        },
        handleClickLink(event) {
            this.$emit('click', event)
            this.handleCheckClick(event, false);
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "./tag.scss"
</style>

