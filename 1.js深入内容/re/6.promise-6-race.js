
// Promise.race Promise.all都是es6提供的方法
// Promise.resolve这些也是

/**
 * Promise.race 竞速，谁的结果先完成就采用谁
 * 
 * 涉及到一个面试题: 如何中断一个Promise（其实就是抛弃promise的成功或者失败的结果）
 */


// 基础用法
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('p1')
//         resolve(1111);
//     }, 2000)
// })
// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('p2')
//         resolve(2222);
//     }, 1000)
// })
// console.time('myCode');
// Promise.race([p2,p1]).then((data) => {
//     console.timeEnd('myCode');
//     console.log(data)
// })

// 中断
// 比如实现：发请求的时候有个超时时间timeout，timeout过一秒，成功的结果就不采纳了

// 初始想法：
// let abort = null;
// let p1 = new Promise((resolve, reject) => {
//     abort = reject;
//     setTimeout(() => {
//         resolve('success');
//     }, 2000)
// })
// setTimeout(() => {
//     abort('timeout 1s')
// }, 1000)
// p1.then((v) => {
//     console.log('result', v)
// }).catch(e => {
//     console.log('err', e)
// })
// 但是这样不方便复用 所以要封装一个新的方法


// 利用的是promise状态不可逆 + 并发
Promise.customRace = (promises) => {
    return new Promise((resolve, reject) => {
        promises.forEach(item => {
            item.then(resolve, reject)
        });
    })
}


function withAbort(promise) {
    let abort;
    let abortPromise = new Promise((resolve, reject) => {
        abort = reject;
    })
    let temp = Promise.customRace([promise, abortPromise]);
    temp.abort = abort;
    return temp;
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 2000)
})

let p2 = withAbort(p1);

setTimeout(() => {
    p2.abort('timeout 1s')
}, 1000)

p2.then((v) => {
    console.log('result', v)
}).catch(e => {
    console.log('err', e)
})









