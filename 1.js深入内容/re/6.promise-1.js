

// 最基本的promise  都是同步的情况

const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';

class CustomPromise {

    state = PENDING;

    executor;
    value;
    reason;

    constructor(executor) {

        const resolve = (data) => {
            if (this.state !== PENDING) {
                return
            }
            this.state = FULLFILLED;
            this.value = data;
        }

        const reject = (data) => {
            if (this.state !== PENDING) {
                return
            }
            this.state = REJECTED;
            this.reason = data;
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }

    }

    then(onFulfilled, onRejected) {
        if (this.state === FULLFILLED) {
            onFulfilled(this.value);
        }
        if (this.state === REJECTED) {
            onRejected(this.reason);
        }
    }

}

const promise1 = new CustomPromise((resolve, reject) => {
    resolve('1243')
    throw Error('!!!')
})

promise1.then((data) => {
    console.log('成功', data)
}, (err) => {
    console.log('失败', err)
})