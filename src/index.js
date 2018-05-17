import Observer from "./Observer/index"
import printMe from './print.js';

let ts = {
    a: 12,
    obs: {
        a:1
    }
}
const observe = new Observer(ts);

ts.a = 3
ts.obs.a =5

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}
console.log('cg1')