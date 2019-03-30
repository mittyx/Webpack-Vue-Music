/**
 * 对象原型中添加一个链
 * @parma oChain 当前对象
 * @parma oProto 链
 */
export default Reflect.appendChain = function (oChain, oProto) {
    if (arguments.length < 2) {
        throw new TypeError('Object.appendChain - Not enough arguments');
    }
    if (typeof oProto === 'number' || typeof oProto === 'boolean') {
        throw new TypeError('second argument to Object.appendChain must be an object or a string');
    }

    var oNewProto = oProto,
        oReturn,
        o2nd,
        oLast;

    oReturn = o2nd = oLast = oChain instanceof Object ? oChain : new oChain.constructor(oChain);

    for (var o1st = this.getPrototypeOf(o2nd); o1st !== Object.prototype && o1st !== Function.prototype; o1st = this.getPrototypeOf(o2nd)) {
        o2nd = o1st;
    }

    if (oProto.constructor === String) {
        oNewProto = Function.prototype;
        oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
        this.setPrototypeOf(oReturn, oLast);
    }

    this.setPrototypeOf(o2nd, oNewProto);
    return oReturn;
}