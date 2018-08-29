const ClassName = {
    ANIMATION: 'shadeAnimation',
    SHADE: 'shade'

}

function _shadeStyle (dom) {
    dom.classList.add(ClassName.SHADE)
}

function _addClick (shadeObj) {
    shadeObj.dom.onclick = function (e) {
        shadeObj.remove()
    }
    return false
}

let shade = {
    dom: null,
    on: function (time) {
        if (!this.dom) {
            this.dom = document.createElement('div')
            _shadeStyle(this.dom)
            _addClick(this)
            document.body.insertBefore(this.dom, document.body.childNodes[0])

            // 添加动画
            this.dom.classList.add(ClassName.ANIMATION)

            // 设置定时器
            if (time && typeof time === 'number') {
                setTimeout(() => {
                    this.remove()
                }, time)
            }
        }
    },
    remove: function () {
        if (this.dom) {
            document.body.removeChild(this.dom)
            this.dom = null
        }
    }
}

export default shade
