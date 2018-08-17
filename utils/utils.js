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
export function formatDate (sec) {
    if (sec === '00:00') { return sec }
    let second = sec % 60
    let minute = Math.floor(sec / 60)
    minute < 10 && (minute = '0' + minute)
    second < 10 && (second = '0' + second)
    return minute + ':' + second
}

// 秒转分
export function minTOsec (time) {
    let min = time.split(':')[0]
    let sec = time.split(':')[1]
    return Number(min*60) + Number(sec)
}

export function getRandomIntInclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// LocalStorage的类
export class LocalStorageCLass {
    constructor () {
        this._localArrayLength = 5
        this._localArray = localStorage.getItem('localData')
        this._initLocalStorage(_localArray)
    }
    _init (_localArray) {
        if (_localArray === null) {
            localStorage.setItem('localData', '[]')
            _localArray = localStorage.getItem('localData')
        }
        if (JSON.parse(_localArray).length > this._localArrayLength) {
            JSON.parse(_localArray).splice(this._localArrayLength - 1, JSON.parse(_localArray).length - (this._localArrayLength - 1))
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
