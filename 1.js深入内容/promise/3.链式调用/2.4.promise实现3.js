/**
 * 链式调用
 * 调用then后返回的是个新的promise
 *
 */

//是公共的方法 不是构造里面的方法 统一处理结果
let resolvePromise = (promise2, x, resolve, reject) => {
    //return自己(自己等待自己) 死循环 所以要直接抛出错误
    if (promise2 === x) {
        reject(new TypeError("error"))
    }
    //判断x是不是一个promise
    //promise有n种实现方式 要兼容别人的方式 以免报错
    //兼容别人的promise有可能没有限制状态改变 可能走了成功又走失败 所以这边控制下
    let called;
    if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        //第一层判断 有可能是一个promise
        try {
            //promise一定有then方法  try catch是为了排除一些自己写的then方法抛出错误的情况（极端）
            let then = x.then;
            //如果then是一个函数 就认为是个promise
            if (typeof then === 'function') {
                // 然后执行then 传出去结果
                // 这边用call来传值 避免用x.then有可能会重复引用
                then.call(x, (y) => {
                    // 有可能resolve的是一个promise（y是promise） 那就要拿这个promise的结果作为resolve的值
                    // 所以递归一下
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {
                //可能then是个null 按普通值走
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        //是一个常量 直接成功
        resolve(x);
    }
};

class Promise {
    constructor(executor) {
        this.data;
        this.err;
        this.state = 'pending';
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        let resolve = (data) => {
            //在这边处理 如果resolve的是一个promise
            if (data instanceof Promise) {
                console.log(data)
                return data.then(resolve, reject)
            }
            if (this.state === 'pending') {
                this.state = 'resolved';
                this.data = data;
                this.onResolvedCallback.forEach((fn) => {
                    fn()
                })
            }
        };
        let reject = (err) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.err = err;
                this.onRejectedCallback.forEach((fn) => {
                    fn()
                })
            }
        };
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }

    //返回新的promise
    then(onFufilled, onRejected) {
        onFufilled = (typeof onFufilled === 'function') ? onFufilled : val => val;
        onRejected = (typeof onRejected === 'function') ? onRejected : err => {
            throw err
        };
        let promise2;
        promise2 = new Promise((resolve, reject) => {
            /**
             * 值的穿透 是个函数的话用定义的 不是则穿透
             * .then() 穿透后即
             * .then((data)=>{
             *     return data
             * })
             */
            //传进来的executor执行器会直接执行 所以下面的代码搬进来就好
            if (this.state === 'resolved') {
                //加定时器是为了能拿到promise2 本来是不一定能拿到的（外面是异步才会拿到 同步就拿不到了）
                setTimeout(() => {
                    try {
                        let x = onFufilled(this.data);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                })
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.err);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                })
            }
            if (this.state === 'pending') {
                this.onResolvedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFufilled(this.data);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err)
                        }
                    })
                });
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.err);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err)
                        }
                    })
                });

            }
        })
        return promise2
    }

    //catch方法 then的语法糖
    catch(errCallback) {
        return this.then(null, errCallback)
    }
}
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}
module.exports = Promise;