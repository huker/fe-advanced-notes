/**
 *  函数式编程的核心 是 组合
 * 
 *  柯里化的标准定义是一步传一个参数的，分开传多个的算是偏函数，但是目前只要把函数拆分都算是柯里化
 * 
 */
function sum(a, b, c, d) {
    return a + b + c + d;
}
// 柯里化的实现
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

let currySum = curry(sum);
const result = currySum(1, 2)(3, 4);
console.log(result)


// function sum(a) {
//     return function(b){
//         return function(c){
//             return a+b+c
//         }
//     }
// }
// const res = sum(1)(2)(3);
// console.log(res)