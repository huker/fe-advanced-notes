/**
 * Created by huk on 2019/7/9.
 */

class Promise {
    constructor(executor) {
        this.data;
        this.err;
        //状态 3种
        this.state = 'pending';
        // resolve和reject和状态应该是每个Promise独立的
        // 而不是写到外面变成了原型上的方法 外面就是统一的了
        // then才是原型上的方法
        let resolve = (data) => {
            //只有pending下才会改变状态 有状态的情况就不会变化了
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.data = data;
            }
        };
        let reject = (err) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.err = err;
            }
        };
        //如果执行出错直接走reject
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err)
        }
    }

    then(onFufilled, onRejected) {
        if (this.state === 'fulfilled') {
            onFufilled(this.data)
        }
        if (this.state === 'rejected') {
            onRejected(this.err)
        }
    }
}

module.exports = Promise;