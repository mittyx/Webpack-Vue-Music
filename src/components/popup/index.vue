<template>
    <transition 
        name="slides"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown">
        <div class="popup"   v-show="componentShow">
            <div class="pabel">
                <p>{{ title }}</p>
                <div class="list">
                    <div>1</div>
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import _ComponentShow from '../mixins/componentShow'
export default {
    name: 'popup',
    data() {
        return {
        }
    },
    props: {
        title: {
            type: String,
            default: '这是一个测试'
        },
    },
    mixins: [_ComponentShow.default],
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.popup{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 100%;
    overflow-y: auto;
    background-color: white;
    z-index: 999;
    transition: all 10s;
}
.pabel{
    padding-left: 10px;
    p{
        height: 40px;
        line-height: 40px;
    }
}
</style>


