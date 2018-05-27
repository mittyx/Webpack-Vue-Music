import Vue from 'vue'
import App from './app.vue'
import router from './router'

import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        homeScroll: 'visible',
        rollShow: true, // 滚动条显示
        navNum: 0, // 当前touch的位置
        sheelShow: true, // 歌单显示
        controlShow: false // 播放界面
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
