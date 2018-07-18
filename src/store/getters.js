export default{
    getPlayState: state => {
        return !state.Xplay
    },
    curPlaySongName: state => {
        if (state.curPlayIndex < 0 || state.curPlayIndex > state.songList.length - 1) {
            return ''
        }
        return state.songList[state.curPlayIndex].songName
    },
    curPlaySingerName: state => {
        if (state.curPlayIndex < 0 || state.curPlayIndex > state.songList.length - 1) {
            return ''
        }
        return state.songList[state.curPlayIndex].singerName
    },
    getDurTime: state => {
        return state.duration
    },
    getPlayMode: state => {
        switch (state.playMode) {
        case 1: return 'icon-icon-6'
        case 2: return 'icon-icon-9'
        default: return 'icon-icon-7'
        }
    }
}
