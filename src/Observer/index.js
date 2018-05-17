import Dep from '../Dep/index'
export default class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()
        if (!value || typeof value !== 'object') {
            return
        } else {
            this.walk(value)
        }
    }

    walk(obj) {
        for (let key in obj) {
            this.defineReactive(obj, key, obj[key])
        }
    }

    defineReactive(data, key, val) {
        if (typeof val === 'object') {
            this.walk(val)
            return
        }
        Object.defineProperty(data, key, {
            enumerable: true, 
            configurable: false, 
            get: function reactiveGetter() {
                return val
            },
            set: function reactiveSetter (newVal) {
                console.log(`${val},${newVal}`);
                val = newVal;
            }
        });
    }
}