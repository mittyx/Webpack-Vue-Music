function StorageMethod() {}

StorageMethod.prototype = {
    getStorage(sname){
        var result = this.getItem(sname);
        return result
    },
    setStorage(sname, svalue){
        if(Array.isArray(svalue) && svalue.length != 0) {
            svalue = svalue.join("|");
        }
        this.setItem(sname, svalue);
    },
    getStorageArray(sname) {
        return this.getItem(sname).split("|");
    },
    getAllKeys(){
        var arr = [];
        for(var i=0;i<this.length;i++){
            arr.push(this.key(i));
        }
        return arr;
    }
}

// if(!window.localStorage || !window.localStorage){
//     alert('your browser is not support Storage!');
//     return false;
// }
// localStorage和sessionStorage添加StorageMethod的方法
Reflect.appendChain(window.localStorage, new StorageMethod());
Reflect.appendChain(window.sessionStorage, new StorageMethod());