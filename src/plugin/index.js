import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import myComponents from 'src/components'
import { Swipe, SwipeItem, Tab, Tabs, Cell, CellGroup, Collapse, CollapseItem, Progress, Slider, Icon, Popup } from 'vant'

import shade from 'src/components/shade'

// 全局axios
Vue.prototype.$ajax = axios

Vue.prototype.$shade = shade

// 组件
Vue.use(myComponents)

// vant
Vue.use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Collapse).use(CollapseItem).use(Cell).use(CellGroup).use(Progress).use(Slider).use(Icon).use(Popup)

// 懒加载
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('images/lazyload/loader.gif'),
    loading: require('images/lazyload/loader.gif'),
    attempt: 1
    // listenEvents: [ 'scroll' ]
})
