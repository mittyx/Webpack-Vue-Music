import { getRandomIntInclusive } from 'root/utils/utils'
export default{
    namespaced: true,
    state: {
        songList: [],
        duration: '00:00',
        getCurTime: 0,
        playMode: 0,
        paused: false,
        Xplay: false,
        audio: null,
        curPlayIndex: -1,
    },
    actions: {
        getDurTime: ({ commit, state }) => {
            state.audio.addEventListener('canplay', function () {
                console.log('加载完毕')
                commit('setDurationTime', this)
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
    },
    getters: {
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
    },
    mutations: {
        setDurationTime: (state, audio) => {
            state.duration = audio.duration
        },
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
        },
        playCurTime: (state, val) => {
            state.audio.currentTime = state.audio.duration * val / 100;
            console.log(state.audio.duration, state.audio.currentTime, val, state.audio)
            if (state.audio.paused) {
                state.audio.play()
                state.paused = true
            }
        },
        musicSwich: (state, index) => {
            state.audio.src = state.songList[index].src
            state.audio.load()
        },
        strategiesN: (state, mode) => {
            if (state.songList.length < 2) {
                return false
            }
            // curPlayIndex加减
            function _setPlayMode() {
                if (mode === 'next' || mode === 'auto') {
                    if (state.curPlayIndex === state.songList.length - 1) {
                        state.curPlayIndex = 0
                    } else {
                        state.curPlayIndex++
                    }
                } else if (mode === 'prev') {
                    if (state.curPlayIndex === 0) {
                        state.curPlayIndex = state.songList.length - 1
                    } else {
                        state.curPlayIndex--
                    }
                }
            }
            // 策略模式state.curPlayIndex播放模式
            let _strateFun = {
                '0': mode => {
                    _setPlayMode(mode)
                },
                '1': mode => {
                    if (mode === 'auto') {
                        return false
                    }
                    _setPlayMode(mode)
                },
                '2': mode => {
                    if (state.songList.length < 2) {
                        return false
                    } else {
                        let recursion = () => {
                            let random = getRandomIntInclusive(0, state.songList.length - 1)
                            if (state.curPlayIndex === random) {
                                recursion()
                            } else {
                                state.curPlayIndex = random
                            }
                        }
                        recursion()
                    }
                }
            }
            return _strateFun[state.playMode](mode)
        }
    }
}