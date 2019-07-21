/**
 * Created by huk on 2019/7/14.
 */

//柯里化
function add(a, b, c) {
    return a + b + c;
}
function currying(fn) {
    let len = fn.length;
    let data = [];
    let cb = (...args) => {
        data.push(...args);
        if (len === data.length) return fn(...data);
        else return cb
    };
    return cb
}
console.log(currying(add)(1)(2)(3));
console.log(currying(add)(1, 2)(3));

//反柯里化
function add2(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}
function unCurrying(fn) {
    return (...args) => {
        let len = args.length;
        let cb = fn;
        for ( let i = 0; i < len; i++ ) {
            cb = cb(args[i])
        }
        return cb
    }
}
console.log(unCurrying(add2)(1, 2, 3));