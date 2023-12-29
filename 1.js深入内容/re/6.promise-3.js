import fs from "fs";
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const _url = fileURLToPath(import.meta.url);
const __dirname = dirname(_url);

// 实现链式调用

const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';

class CustomPromise {

    state = PENDING;
    executor;
    value;
    reason;
    onFulfilledTask = [];
    onRejectedTask = [];

    constructor(executor) {
        const resolve = (data) => {
            if (this.state !== PENDING) {
                return
            }
            this.state = FULLFILLED;
            this.value = data;
            // 发布
            this.onFulfilledTask.forEach((task) => {
                task()
            })
        }
        const reject = (data) => {
            if (this.state !== PENDING) {
                return
            }
            this.state = REJECTED;
            this.reason = data;
            // 发布
            this.onRejectedTask.forEach((task) => {
                task()
            })
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        // 收集订阅
        // 切片的写法 更容易扩展 可以做一些统一处理 比如错误处理什么的
        const nextPromise = new CustomPromise((resolve, reject) => {
            if (this.state === FULLFILLED) {
                // 因为内部需要nextPromise 但是js的执行顺序下 nextPromise是取不到的 
                // process.nextTick是把它变成了微任务 在主线结束后 再执行
                process.nextTick(() => {
                    try {
                        const x = onFulfilled(this.value);
                        // resolve(x);
                        // 通过x判断 走成功还是走失败
                        resolvePromise(nextPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.state === REJECTED) {
                process.nextTick(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(nextPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.state === PENDING) {
                this.onFulfilledTask.push(() => {
                    process.nextTick(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(nextPromise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                });
                this.onRejectedTask.push(() => {
                    process.nextTick(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(nextPromise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                });
            }
        })

        return nextPromise;
    }
}

function resolvePromise(nextPromise, x, resolve, reject) {
    if (x === nextPromise) {
        reject('type error')
    }
    try {
        if (x && x.then && (typeof x === 'object')) {
            let then = x.then
            then.call(x, (v) => {
                resolve(v)
            }, (v) => {
                reject(v)
            })
        } else {
            resolve(x);
        }
    } catch (e) {
        reject(e)
    }
}

const p1 = new CustomPromise((resolve, reject) => {
    resolve('ok')
}).then((v) => {
    console.log('2', v)
    return new CustomPromise((resolve2) => { resolve2('2234') })
}).then((v) => {
    return new Promise((resolve3) => {
        setTimeout(() => {
            a
            resolve3('set!!!!!')
        }, 1000)
    })
}).then(v => {
    console.log('last', v)
})


// 可以返回一个promise 也可以返回一个不报错的任意值 这个值会作为下一次then的参数
// 走到失败的情况：1.throw错误  2.返回的是一个失败的promise
// 上一个then失败，流入失败的时候如果什么也没做，也会以undefined的值流入下一个then的成功

// function readFile(path) {
//     return new CustomPromise((resolve, reject) => {
//         fs.readFile(path, 'utf-8', function (err, data) {
//             resolve(data);
//         })
//     })
// }

// readFile(resolve(__dirname, 'name.txt')).then((v) => {
//     console.log('v1', v)
//     return readFile(resolve(__dirname, 'age.txt'))
// }).then((v) => {
//     console.log('v2', v)
// }, (e) => {
//     console.log('err', e)
// })