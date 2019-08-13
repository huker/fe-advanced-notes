/**
 * Created by huk on 2019/8/6.
 */

let context = {};

/**
 * 这边的this是Object.create后的ctx
 * context只是做了代理 在context上是取不到的
 */

function defineGetter(obj, key) {
    //__defineGetter__只是简写了defineProperty
    context.__defineGetter__(key, function () {
        return this[obj][key]
    })
}


function defineSetter(obj, key) {
    //__defineGetter__只是简写了defineProperty
    context.__defineSetter__(key, function (v) {
        this[obj][key] = v;
    })
}

//getter
defineGetter('request', 'url');
defineGetter('request', 'path');
defineGetter('response', 'body');
//setter
defineSetter('response', 'body');

module.exports = context;