export default {
    Mplay: state => {
        !state.Xplay ? state.Xplay = true : state.Xplay = false
    },
    playPaused: state => {
        if (state.audio.paused) {
            state.paused = false
        } else {
            state.paused = true
        }
    }
}
