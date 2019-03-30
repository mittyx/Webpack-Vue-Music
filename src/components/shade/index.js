function Shade(option = {}) {
    this.elemment = document.createElement('div')
    this.callback = null
    this.init()
}
Shade.prototype = {
    init() {
        this.elemment.classList.add('shade')
        this.elemment.onclick = () => {
            this.removeShade()
        }
    },
    addShade(animation, callback =function() {}) {
        if(animation === true) {
            this.elemment.classList.add('shadeAnimation')
        }
        this.callback = callback
        document.body.insertBefore(this.elemment, document.body.childNodes[0])
    },
    removeShade() {
        if(this.elemment) {
            document.body.removeChild(this.elemment)
            this.callback()
        }
    }
}

export default new Shade()

