import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import { Swipe, SwipeItem, Tab, Tabs, Cell, CellGroup, Collapse, CollapseItem, Progress, Slider } from 'vant'
import '~/css/joggle.scss'

// vant
Vue.use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Collapse).use(CollapseItem).use(Cell).use(CellGroup).use(Progress).use(Slider)

Vue.config.productionTip = false

// 全局axios
Vue.prototype.$ajax = axios

// 懒加载
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('images/lazyload/loader.gif'),
    loading: require('images/lazyload/loader.gif'),
    attempt: 1
    // listenEvents: [ 'scroll' ]
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
