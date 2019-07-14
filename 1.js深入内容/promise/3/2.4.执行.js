/**
 * promise的链式调用
 * 避免回调地狱
 *
 * 1.then方法无论是成功还是失败 返回结果是一个普通值的话都会把这个结果传递给外层then的下一个then的成功回调
 *
 * 2.如果then方法内部抛错了（或者返回一个失败的promise）这错误会走外部then的下一个then的失败回调
 * 如果下一个then没有处理错误 就会穿透继续传下去 如果到最后都没找到处理错误的地方 就会报错
 *
 * 3.cache其实算是个语法糖 放在最后捕获错误 其实就是then(null,func)
 *
 * 4.如果成功、失败的返回值是个promise 就会让promise执行 采用它的结果状态来往下走
 *
 * 5.promise的链式调用不是靠this 而是每次返回一个新的promise 因为一个promise的成功失败状态不可变
 * 链式往下走可以进失败再进成功等 所以每次都返回新的promise
 */

let Promise = require("./2.4.promise实现3.js");
let fs = require('fs');
let path = require('path');

function readFile(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname + "/" + url), 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}

readFile('./name.txt').then((data) => {
    // console.log("1", data)
    // return readFile(data)
    return 100
}, (err) => {
    throw new Error("???")
}).then((res) => {
    console.log("then", res)
}).then()
    .catch((err) => {
        console.log("catch", err)
    })