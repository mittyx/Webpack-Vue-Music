import MusicProgress from './progress/index'
import Popup from './popup/index'
import Cell from './cell/index'

let components = [MusicProgress, Popup, Cell]

const install = Vue => {
    components.forEach(Component => {
        Vue.component(Component.name, Component)
    })
}

export {
    MusicProgress,
    Popup,
    Cell
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default install
