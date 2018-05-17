export default class Dep {
	constructor () {
		this.subs = []
	}

	addsub (sub) {
		this.subs.push(sub)
	}

	depend () {
	    if (Dep.target) {
	      Dep.target.addDep(this) 
	    }
  	}

  	notify () {
		for (const key in this.subs) {
			this.subs[key].update()
		}
  	}
}

Dep.target = null