import MusicProgress from './progress/progress'
import Popup from './popup'
import Cell from './cell'

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
