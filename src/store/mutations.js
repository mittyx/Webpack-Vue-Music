/*
 * ps:action中不能得到mutation的return
 */
import { getRandomIntInclusive } from 'root/utils/utils'
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
    },
    playCurTime: (state, val) => {
        state.audio.currentTime = state.audio.duration * (val / 100)
        if (state.audio.paused) {
            state.audio.play()
            state.paused = true
        }
    },
    musicSwich: (state, n) => {
        state.audio.src = state.songList[n].src
        state.audio.load()
    },
    strategiesN: (state, cmd) => {
        if (state.songList.length < 2) {
            return false
        }

        let _setFun = cmd => {
            if (cmd === 'next' || cmd === 'auto') {
                if (state.curPlayIndex === state.songList.length - 1) {
                    state.curPlayIndex = 0
                } else {
                    state.curPlayIndex++
                }
            } else if (cmd === 'prev') {
                if (state.curPlayIndex === 0) {
                    state.curPlayIndex = state.songList.length - 1
                } else {
                    state.curPlayIndex--
                }
            }
        }
        // 策略模式state.curPlayIndex播放模式
        let _strateFun = {
            '0': cmd => {
                _setFun(cmd)
            },
            '1': cmd => {
                if (cmd === 'auto') {
                    return false
                }
                _setFun(cmd)
            },
            '2': cmd => {
                console.log(state.songList)
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
        return _strateFun[state.playMode](cmd)
    }
}
