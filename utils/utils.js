// promise简单封装ajax
export function myAjax (url, async) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP')
        xhr.open('GET', url, async)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                xhr.status === 200 ? resolve(xhr.responseText) : reject()
            }
        }
        xhr.send()
    })
}
// lrc解析
export function lrcRegular (lrc) {
    const regTime = /\d{2}:\d{2}/g
    const regLyric = /\s[\s:a-zA-Z0-9_\u4e00-\u9fa5]*\n|\n/g
    let obj = {}
    let lrcReg = lrc.replace(/\[(\d{2}:\d{2})[.:](\d{2,3})\]/g, '$1')
    let regularTime = lrcReg.match(regTime)
    let regularLyric = lrc.match(regLyric)
    for (let i in regularTime) {
        obj[ regularTime[i] ] = regularLyric[i]
    }
    return {obj, regularTime, regularLyric}
}
// 秒转分秒
export function minSec (arg) {
    if (arg === '00:00') { return arg }
    let second = arg % 60
    let minute = Math.floor(arg / 60)
    minute < 10 && (minute = '0' + minute)
    second < 10 && (second = '0' + second)
    return minute + ':' + second
}

// LocalStorage的类
export class LocalStorageCLass {
    constructor () {
        this._localArrayLength = 5
        this._localArray = localStorage.getItem('localData')
        this._init()
    }
    _init (localArrayLength) {
        if (this._localArray === null) {
            localStorage.setItem('localData', '[]')
            this._localArray = localStorage.getItem('localData')
        }
        if (JSON.parse(this._localArray).length > this._localArrayLength) {
            JSON.parse(this._localArray).splice(this._localArrayLength - 1, JSON.parse(this._localArray).length - (this._localArrayLength - 1))
        }
    }
    getValue () {
        this._localArrayJsonParse = [...new Set(JSON.parse(this._localArray))]
        return this._localArrayJsonParse
    }
    addValue (val) {
        let localArray = JSON.parse(this._localArray)
        if (localArray.length > this._localArrayLength) {
            if (!~localArray.indexOf(val)) {
                localArray.shift()
                localArray.push(val)
            } else {
                localArray.splice(localArray.indexOf(val), 1)
                localArray[localArray.length] = val
            }
        } else {
            localArray[localArray.length] = val
        }
        this._localArray = JSON.stringify(localArray)
    }
    ts () {
        console.log(1)
    }
}
