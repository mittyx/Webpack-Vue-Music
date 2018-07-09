export default{
    getPlayState: state => {
        return !state.Xplay
    },
    curPlaySongName: state => {
        if (state.curPlayIndex < 0) {
            return ''
        }
        return state.songList[state.curPlayIndex].songName
    },
    curPlaySingerName: state => {
        if (state.curPlayIndex < 0) {
            return ''
        }
        return state.songList[state.curPlayIndex].singerName
    },
    playPaused: state => {
        if (state.audio === null) {
            return false
        }
        if (state.audio.paused) {
            return false
        } else {
            return true
        }
    }
}
