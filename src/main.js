import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import './plugin'
import '~/css/joggle.scss'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
