// 柯里化和组合一起


// HELLO_WORLD
let str = 'hello world';

function func1(str, sep) {
    return str.split(sep);
}
function func2(arr, sep) {
    return arr.join(sep);
}
function func3(str) {
    return str.toUpperCase();
}

// 利用柯里化把传入参数的位置变换
let split = curry((sep, data) => {
    return func1(data, sep);
})
let join = curry((sep, data) => {
    return func2(data, sep);
})

const composeFunction = flow(split(' '), join('_'), func3);
const res = composeFunction(str)
console.log(res);

//  lodash中提供了fp做柯力化 lodash.fp
//  const composeFunction = fp.flowRight(fp.toUpper,fp.join('_'),fp.split(' '))


function curry(fn) {
    let argsArr = [];
    let curried = function (...args) {
        argsArr = argsArr.concat([...args])
        if (fn.length === argsArr.length) {
            return fn(...argsArr);
        } else {
            return curried
        }
    }
    return curried
}

function flow(...argsFn) {
    const fns = [...argsFn];
    return fns.reduce((prev, next) => {
        return function (...argsValue) {
            return next(prev(...argsValue))
        }
    })
}