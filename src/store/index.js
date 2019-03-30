import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import moduleAudio from './audio'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        moduleAudio: moduleAudio
    },
    state,
    getters,
    mutations,
    actions
})
