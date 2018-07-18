export default {
    getDurTime: ({ state }) => {
        state.audio.addEventListener('canplay', function() {
            console.log('加载完毕')
            state.duration = this.duration
        })
    },
    next: ({ commit, state }) => {
        // state.curPlayIndex++
        // if (state.curPlayIndex > state.songList.length - 1) {
        //     state.curPlayIndex = state.songList.length - 1
        // }
        console.log(state.curPlayIndex)
        state.curPlayIndex = commit('strategiesN', state.curPlayIndex)
        commit('musicSwich', state.curPlayIndex)
        state.audio.play()
    },
    prev: ({ commit, state }) => {
        state.curPlayIndex--
        if (state.curPlayIndex < 0) {
            state.curPlayIndex = 0
        }
        commit('musicSwich', state.curPlayIndex)
        state.audio.play()
    },
    audioEnded: ({ commit, state }) => {
        
    }
}
