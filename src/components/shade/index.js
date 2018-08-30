const ClassName = {
    ANIMATION: 'shadeAnimation',
    SHADE: 'shade'

}

function _shadeStyle (dom) {
    dom.classList.add(ClassName.SHADE)
}

function _addClick (shadeObj, callBack) {
    shadeObj.dom.onclick = function (e) {
        shadeObj.off()
        if (callBack) {
            callBack()
        }
    }
    return false
}

let shade = {
    dom: null,
    on: function (callBack) {
        if (!this.dom) {
            this.dom = document.createElement('div')
            _shadeStyle(this.dom)
            _addClick(this, callBack)
            document.body.insertBefore(this.dom, document.body.childNodes[0])

            // 添加动画
            this.dom.classList.add(ClassName.ANIMATION)

            // 设置定时器
            // if (time && typeof time === 'number') {
            //     setTimeout(() => {
            //         this.off()
            //     }, time)
            // }
        }
    },
    off: function () {
        if (this.dom) {
            document.body.removeChild(this.dom)
            this.dom = null
        }
    }
}

export default shade
