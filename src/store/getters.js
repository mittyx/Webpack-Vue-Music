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
    }
}
