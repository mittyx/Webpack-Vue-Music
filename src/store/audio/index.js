import { getRandomIntInclusive, formatDate } from 'root/utils/utils'
const playModeList = ['order', 'single', 'random']
export default{
    namespaced: true,
    state: {
        songList: [],
        duration: '00:00',
        currentTime: 0,
        playModeIndex: 0,
        paused: false,
        Xplay: false,
        audio: null,
        curPlayIndex: 0,
    },
    actions: {
<<<<<<< HEAD
        getDurTime: ({ state }) => {
            setInterval(function(){
                state.duration = state.audio.duration;
            },1000);
            state.audio.addEventListener('canplay', function() {
                state.duration = this.duration
            })
            state.audio.addEventListener('loadedmetadata', function() {
                state.duration = this.duration
=======
        start: ({state, dispatch}) => {
            let songSrc = state.songList[state.curPlayIndex].src
            state.audio = new Audio(`/${songSrc.substring(2)}`)
            state.audio.load()
            dispatch('getDurTime')
            dispatch('audioEnded')
        },
        getDurTime: ({ commit, state }) => {
            state.audio.addEventListener('canplay', function() {
                console.log('加载完毕')
                commit('setDurationTime', this)
>>>>>>> origin/master
            })
        },
        next: ({ commit, state, getters }) => {
            if(getters.playMode === 'single') {
                commit('playIndex', 'order')
            } else [
                commit('playIndex', getters.playMode)
            ]
            commit('musicSwich', state.curPlayIndex)
            state.audio.play()
        },
        prev: ({ commit, state }) => {
            commit('playIndex', 'next')
            commit('musicSwich', state.curPlayIndex)
            state.audio.play()
        },
        audioEnded: ({ commit, state, getters }) => {
            state.audio.addEventListener('ended', function() {
                console.log('播放结束,下一曲中>>>')
                commit('playIndex', getters.playMode)
                commit('musicSwich', state.curPlayIndex)
                state.audio.play()
            })
        },
        audioTimeUpdate: ({ state }, res) => {
            state.audio.addEventListener('timeupdate',function() {
                state.currentTime = this.currentTime
                res.callback()
            })
        }
    },
    getters: {
        getPlayState: state => {
            return !state.Xplay
        },
        playMode: state => {
            return playModeList[state.playModeIndex]
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
        getDuration: state => {
            return formatDate(parseInt(state.duration))
        },
        getCurrentTime: state=> {
            return formatDate(parseInt(state.currentTime))
        },
        getsssTime: state=> {
            return state.duration
        },
        setPlayModeIcon: (state) => {
            switch (playModeList[state.playModeIndex]) {
                case 'single': return 'icon-icon-6'
                case 'random': return 'icon-icon-9'
                case 'order': return 'icon-icon-7'
            }
        }
    },
    mutations: {
        start: (state) => {
            let songSrc = state.songList[state.curPlayIndex].src
            state.audio = new Audio(`http://120.79.222.175:80/${songSrc.substring(2)}`)
            state.audio.load()
        },
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
            if (state.audio.paused) {
                state.audio.play()
                state.paused = true
            }
        },
        setPlayMode: (state) => {
            if(state.playModeIndex < playModeList.length - 1) {
                state.playModeIndex++
            }else {
                state.playModeIndex = 0
            }
        },
        musicSwich: (state, index) => {
            state.audio.src = state.songList[index].src
            state.audio.load()
        },
        playIndex: (state, playMode) => {
            if (state.songList.length < 1) {
                return false
            }
            let playIndex = state.curPlayIndex

            const setPlayIndex = {
                order() {
                    if (playIndex === state.songList.length - 1) {
                        playIndex = 0
                    } else {
                        playIndex++
                    }
                },
                next() {
                    if (state.playIndex === 0) {
                        state.playIndex = state.songList.length - 1
                    } else {
                        state.playIndex--
                    }
                },
                single() {
                    playIndex = playIndex
                },
                random() {
                    function recursion() {
                        let random = getRandomIntInclusive(0, state.songList.length - 1)
                        if (playIndex === random) {
                            recursion()
                        } else {
                            playIndex = random
                        }
                    }
                    recursion()
                }
            }
            setPlayIndex[playMode]()
            state.curPlayIndex = playIndex
        }
    }
}