export default {
    Mplay: state => {
        !state.Xplay ? state.Xplay = true : state.Xplay = false
    },
    playPaused: state => {
        if (state.audio.paused) {
            state.audio.play()
            state.paused = true
        } else {
            state.audio.pause()
            state.paused = false
        }
    }
    
}
