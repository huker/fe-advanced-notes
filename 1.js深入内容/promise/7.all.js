// /**
//  * Created by huk on 2019/7/29.
//  */
//
//
// //同步多个异步的返回结果
// //Promise.all
//
//
// let fs = require('fs').promises;
//
// function isPromise(value) {
//     if (typeof value === 'function' || (typeof value === 'object' && value !== null)) {
//         if (typeof value.then === 'function') {
//             return true
//         }
//     }
//     return false
// }
//
// Promise.all = function (fns) {
//     return new Promise((resolve, reject) => {
//         let arr = [];
//         let checkRes = (i, value) => {
//             arr[i] = value;
//             if (arr.length === fns.length) {
//                 resolve(arr)
//             }
//         };
//         for ( let i = 0; i < fns.length; i++ ) {
//             if (isPromise(fns[i])) {
//                 fns[i].then((res) => {
//                     checkRes(i, res);
//                 }, reject)
//             } else {
//                 checkRes(i, fns[i]);
//             }
//         }
//     })
// };
//
// Promise.all([
//     fs.readFile('./test1.txt', 'utf8'),
//     1,
//     fs.readFile('./test2.txt', 'utf8')
// ]).then((res) => {
//     console.log(res)
// });


function fun1() {
    console.log("fun1")
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("fun11")
            resolve("fun1+1")
        }, 1200)
    })
}

function fun2() {
    console.log("fun2")
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("fun22")
            resolve("fun2+2")
        }, 1000)
    })
}

Promise.all([fun1(),fun2()]).then((res) => {
    console.log(res)
})
