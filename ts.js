export class LocalStorageCLass {
    constructor (localArrayLength) {
        this._localArray = localStorage.getItem('localData')
        this.localArrayLength = localArrayLength || 5
        this._init()
    }
    _init (localArrayLength) {
        if (this._localArray === null) {
            localStorage.setItem('localData', '[]')
            this._localArray = localStorage.getItem('localData')
        }
        if (JSON.parse(this._localArray) > localArrayLength + 1) {
            JSON.parse(this._localArray).splice(5, JSON.parse(this._localArray).length - 5)
        }
    }
    getValue () {
        let localStorageData = JSON.parse(this._localArray)
        localStorageData = [...new Set(localStorageData)]
        return localStorageData
    }
    addValue (val) {
        let localArray = JSON.parse(this._localArray)
        if (localArray.length >= this.localArrayLength) {
            if (!~localArray.indexOf(val)) {
                localArray.shift()
                localArray[localArray.length] = val
            } else {
                localArray.splice(localArray.indexOf(name), 1)
                localArray[localArray.length] = val
            }
        } else {
            localArray[localArray.length] = val
        }
    }
}
