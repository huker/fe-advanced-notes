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
                    // resolve(y)
                    // 有可能resolve的是一个promise（y是promise） 那就要拿这个promise的结果作为resolve的值
                    // 所以递归一下
                    resolvePromise(then, y, resolve, reject)
                }, (r) => {
                    reject(r)
                })
            } else {
                //可能then是个null
                resolve(x)
            }
        } catch (e) {
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
        } catch (err) {
            reject(err)
        }
    }

    //返回新的promise
    then(onFufilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
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
                if (onFufilled) {
                    this.onResolvedCallback.push(() => {
                        try {
                            let x = onFufilled(this.data);
                            resolvePromise(x);
                        } catch (err) {
                            reject(err)
                        }
                    });
                }
                if (onRejected) {
                    this.onRejectedCallback.push(() => {
                        try {
                            let x = onRejected(this.err);
                            resolvePromise(x);
                        } catch (err) {
                            reject(err)
                        }
                    });
                }
            }
        })
        return promise2

    }
}

module.exports = Promise;