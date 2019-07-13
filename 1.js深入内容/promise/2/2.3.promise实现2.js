/**
 * Created by huk on 2019/7/11.
 */


/**
 * then之后要捕捉到异步的结束然后再执行对应的（成功、失败）函数
 * 其实就是发布订阅 then是订阅了 异步结束后就发布
 * 一个promise也可以then几次 所以then订阅的函数应该存起来 等通知后一起触发
 *
 */

class Promise {
    constructor(executor) {
        this.data;
        this.err;
        this.state = 'pending';
        //存起来订阅的内容
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

    then(onFufilled, onRejected) {
        if (this.state === 'resolved') {
            onFufilled(this.data)
        }
        if (this.state === 'rejected') {
            onRejected(this.err)
        }
        //异步的时候这边其实还是pending 这时候应该把函数存起来（订阅起来）
        if (this.state === 'pending') {
            if (onFufilled) {
                this.onResolvedCallback.push(() => {
                    onFufilled(this.data)
                });
            }
            if (onRejected) {
                this.onRejectedCallback.push(() => {
                    onRejected(this.err)
                });
            }
        }
    }
}

module.exports = Promise;