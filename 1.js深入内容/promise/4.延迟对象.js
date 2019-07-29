/**
 * Created by huk on 2019/7/28.
 */

let fs = require('fs');
let Promise1 = require('./3/2.4.promise实现3.js');

// /原本 这样写法套用比较多 几层
// function read(path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, function (err, data) {
//             if (err) reject(err);
//             resolve(data);
//         })
//     })
// }

//使用延迟对象 减少套用 bluebird之类的promise库都提供
//这边引入我们自己实现的promise 里面添加了defer的方法

function read(path) {
    //是一个对象 {promise,reject,resolve}
    let der = Promise1.defer();
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) der.reject(err);
        der.resolve(data);
    })
    return der.promise
}
read('./总结.md').then((res) => {
    console.log(res)
})