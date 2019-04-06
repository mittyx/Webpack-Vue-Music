class Observer {
    constructor () {
        this.clientList = {}
    }
    listen (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    }
    trigger (key, ...arg) {
        let fns = this.clientList[key]
        if (!fns || fns.length === 0) {
            return false
        }
        for (let fn of fns) {
            fn.call(this, ...arg)
        }
    }
}

export default Observer
