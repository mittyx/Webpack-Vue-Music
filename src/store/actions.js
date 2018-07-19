export default {
    getDurTime: ({ state }) => {
        state.audio.addEventListener('canplay', function () {
            console.log('加载完毕')
            state.duration = this.duration
        })
    },
    next: ({ commit, state }) => {
        commit('strategiesN', 'next')
        commit('musicSwich', state.curPlayIndex)
        state.audio.play()
    },
    prev: ({ commit, state }) => {
        commit('strategiesN', 'prev')
        commit('musicSwich', state.curPlayIndex)
        state.audio.play()
    },
    audioEnded: ({ commit, state }) => {
        state.audio.addEventListener('ended', function () {
            console.log('播放结束,下一曲中>>>')
            commit('strategiesN', 'auto')
            commit('musicSwich', state.curPlayIndex)
            state.audio.play()
        })
    }
}
