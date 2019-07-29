/**
 * promise主要是解决异步问题
 * 2.2里没有实现 这边继续优化
 *
 */

// let action = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (Math.random() < 0.5) {
//                 resolve();
//             } else {
//                 reject();
//             }
//         }, 1000)
//     })
// };
//
// action().then(() => {
//     console.log("正面")
// }, () => {
//     console.log("反面")
// })

let Promise = require("./2.3.promise实现2.js");

let a = new Promise((resolve, reject) => {
    //111会被打出来
    console.log("111");
    setTimeout(() => {
        resolve("haha")
    }, 1000)
})

a.then((data) => {
    console.log("resolve", data)
}, (err) => {
    console.log("reject", err)
})

