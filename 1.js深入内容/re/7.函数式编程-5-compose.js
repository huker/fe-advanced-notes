/**
 * 组合
 * 
 * 比如 redux  koa express router什么的都有一个个的中间件 
 * 
 * 
 * 早期写法 c(b(a())) 
 * 
 * 或者装饰器
 *  @a
 *  @b
 * class xxx
 * 
 * 或者过滤器
 * a() | b() | c()
 * 
 * 
 */

function doubleValue(n) {
    return n * 2;
}

function toFixed(n) {
    return n.toFixed(2);
}

function addPrefix(n) {
    return '$' + n;
}

// 不使用组合的写法
// const res = addPrefix(toFixed(doubleValue(100)));
// console.log(res);

// lodash提供flow和flowRight方法 实现从左到右 从右到左的组合函数

function flow(...argsFn) {
    const fns = [...argsFn];
    return fns.reduce((prev, next) => {
        return function (...argsValue) {
            console.log(...argsValue)
            return next(prev(...argsValue))
        }
    })

    // let res;
    // for (let i = 0; i < fns.length; i++) {
    //     if (res) {
    //         res = fns[i](res);
    //     } else {
    //         res = fns[i](...argsValue);
    //     }
    // }
    // return res;
}

let compose = flow(doubleValue, toFixed, addPrefix);
const res = compose(100);
console.log(res);
