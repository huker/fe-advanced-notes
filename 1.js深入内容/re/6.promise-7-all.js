/**
 * Promise.all
 * 
 * 还有个allSettled是永远fullfield出来result的集合，集合中指出各个promise的成功失败结果
 */


Promise.customAll = (promises) => {
    return new Promise((resolve, reject) => {
        let result = new Array(promises.length);
        let success = 0;
        for (let i = 0; i < promises.length; i++) {
            let promise = promises[i];
            Promise.resolve(promise).then((v) => {
                result[i] = v;
                success++;
                if (success === promises.length) {
                    resolve(result);
                }
            }, reject)
        }
    })
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success111');
    }, 2000)
})


let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success2222');
    }, 1000)
})

console.time('test')
Promise.customAll([p1, p2, '5']).then((data) => {
    console.log(data)
    console.timeEnd('test')
})






