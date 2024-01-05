
// 1.递归解析 
// 2.值的穿透 then没有处理的会穿透到下面去

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
        onFulfilled = (typeof onFulfilled === "function") ? onFulfilled : (v) => { return v };
        onRejected = (typeof onRejected === "function") ? onRejected : (v) => { throw v };
        const nextPromise = new CustomPromise((resolve, reject) => {
            if (this.state === FULLFILLED) {
                process.nextTick(() => {
                    try {
                        const x = onFulfilled(this.value);
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
        let called = false;
        if (x && x.then && (typeof x === 'object')) {
            let then = x.then
            then.call(x,
                (v) => {
                    if (called) return
                    called = true;
                    // resolve(v)
                    // 成功才需要递归  失败不用继续解析了
                    resolvePromise(nextPromise, v, resolve, reject);
                }, (v) => {
                    if (called) return
                    called = true;
                    reject(v)
                })
        } else {
            if (called) return
            called = true;
            resolve(x);
        }
    } catch (e) {
        if (called) return
        called = true;
        reject(e)
    }
}

const p1 = new CustomPromise((resolve, reject) => {
    resolve('ok')
}).then(() => {
    return new CustomPromise((resolve, reject) => {
        setTimeout(() => {
            // resolve一个promise
            resolve(new CustomPromise((resolve, reject) => {
                setTimeout(() => {
                    resolve('111111')
                }, 1000)
            }))
        }, 1000)
    })
})

p1.then()
    .then()
    .then((data) => {
        console.log('last', data)
    })



// const p2 = new Promise((resolve, reject) => {
//     resolve('ok')
// }).then(() => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve('111111')
//                 }, 1000)
//             }))
//         }, 1000)
//     })
// })

// 穿透
// p2.then()
//     .then()
//     .then((data) => {
//         console.log('last', data)
//     })