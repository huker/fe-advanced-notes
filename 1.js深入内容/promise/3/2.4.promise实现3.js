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
    if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        //第一层判断 有可能是一个promise

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