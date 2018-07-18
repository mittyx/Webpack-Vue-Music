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
    strategiesN: (state, n) => {
        var strateFun = {
            '0': index => {
                return index
            },
            '1': index => {
                return index
            },
            '2': index => {
                if (state.songList.length < 1) {
                    console.log(index)
                    return index
                } else {
                    let recursion = () => {
                        let random = getRandomIntInclusive(0, state.songList.length - 1)
                        if (index === random) {
                            recursion()
                        } else {
                            return random
                        }
                    }
                    recursion()
                }
            }
        }
        return strateFun[state.playMode](n)
    }
}
