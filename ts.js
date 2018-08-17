export class VueAudio {
    constructor (musicSrc) {
        this.audio = new Audio(this.musicSrc)
        // _this.currentTime
    }
}
class Person {
    constructor (name) {
        this.name = name
    }
}
class Me extends Person {
    constructor (name) {
        super(name)
    }
    getGirlFriend () {
        console.log('load...')
        console.log(`${this.name} is haven't girlfriend`)
    }
}
