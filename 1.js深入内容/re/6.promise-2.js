

// 实现异步
// 核心思路还是回调 发布订阅

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
        // this.onFulfilledTask.push(onFulfilled);
        // this.onRejectedTask.push(onRejected);

        // 切片的写法 更容易扩展 可以做一些统一处理 比如错误处理什么的
        this.onFulfilledTask.push(() => {
            onFulfilled(this.value)
        });
        this.onRejectedTask.push(() => {
            onRejected(this.reason)
        });


        if (this.state === FULLFILLED) {
            onFulfilled(this.value);
        }
        if (this.state === REJECTED) {
            onRejected(this.reason);
        }
    }

}

const promise1 = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('abc')
    }, 1000)
    // resolve('123')
})

promise1.then((data) => {
    console.log('成功11', data)
}, (err) => {
    console.log('失败11', err)
})

promise1.then((data) => {
    console.log('成功22', data)
}, (err) => {
    console.log('失败22', err)
})