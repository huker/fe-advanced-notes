
// Promise.resolve
// Promise.reject

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

    static resolve(v) {
        return new CustomPromise((resolve) => {
            resolve(v)
        })
    }

    static reject(v) {
        return new CustomPromise((resolve, reject) => {
            reject(v)
        })
    }


    constructor(executor) {
        const resolve = (data) => {
            if (data instanceof CustomPromise) {
                return data.then(resolve, reject) // 递归解析
            }
            if (this.state !== PENDING) {
                return
            }
            this.value = data;
            this.state = FULLFILLED;
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


// CustomPromise.resolve(1).then((data) => {
//     console.log(data)
// })

let p1 = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123)
    }, 1000)
})

CustomPromise.resolve(p1).then((data) => {
    console.log('aa', data)
})

CustomPromise.reject(p1).then((data) => {
    console.log('aa', data)
}, (e) => {
    console.log('err', e)
})


// Promise.reject会直接走到失败 不会再解析reject中的promise了
// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123)
//     }, 1000)
// })
// 
// Promise.reject(p2).then(()=>{
// },(e)=>{
//     console.log('error',e)
// })