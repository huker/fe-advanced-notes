/**
 * Created by huk on 2019/7/28.
 */

let Promise = require('./3/2.4.promise实现3.js');

//3下面的实现还有一个漏洞

//这里resolve的是一个promise 这种时候 会等待promise执行的结果

function fn() {
    return new Promise((resolve) => {
        resolve(new Promise((resolve, reject) => {
            resolve(100)
        }))
    })
}

fn().then((res) => {
    console.log(res)
})