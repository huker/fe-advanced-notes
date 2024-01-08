/**
 *  高阶函数：
 *  一个函数 参数是函数 或者 返回一个函数  就是高阶函数
 * 
 */

// 最典型的reduce就是 函数作为参数
// Array.prototype.reduce = function (fn, init) {
//     let temp = init || this[0];
//     let index = init ? 0 : 1;

//     // 抽象了运算过程
//     for (let i = index; i < this.length; i++) {
//         temp = fn(temp, this[i]);
//     }

//     return temp
// }

// let arr = [1, 2, 3, 4, 5];
// const sum = arr.reduce((prev, next) => prev + next, 0);
// console.log(sum)


// 函数作为返回值  缓存
// lodash.memoize就是这个意思 这也是闭包的概念

// 这是一个纯函数
function sum(a, b) {
    console.log('执行了sum')
    return a + b;
}
function memoize(fn, resolver) {
    let cache = {};
    return function (...args) {
        const key = resolver(...args);
        let result = cache[key];
        if (!result) {
            result = fn(...args)
            cache[key] = result;
        }
        return result
    }
}
// 第二个参数是缓存的标志 默认是第一个参数（就是下面的1
// const memoizeSum = lodash.memoize(sum, function (...args) {
const memoizeSum = memoize(sum, function (...args) {
    return JSON.stringify(args);
})
console.log(memoizeSum(1, 2));
console.log(memoizeSum(1, 2)); // 1,2只会执行一次sum 执行过一次就缓存住了
console.log(memoizeSum(1, 3));