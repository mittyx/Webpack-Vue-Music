import musicProgress from './progress/progress'

musicProgress.install = function (Vue, options = {}) {
    Vue.component(options.componentName || musicProgress.name, musicProgress)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    Vue.component(musicProgress.name, musicProgress)
}

export default musicProgress
