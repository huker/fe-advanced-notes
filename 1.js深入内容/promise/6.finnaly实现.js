/**
 * Created by huk on 2019/7/23.
 */

/**
 * 无论成功还是失败都会走回调
 * finally还是一个then的语法糖 它then之后还是可以进入Promise的对应状态（调finally的那个Promise）
 * 还要注意return Promise.resolve是为了有可能resolve的是一个promise 要等待执行结束 再finally
 */

Promise.prototype.finally = function (cb) {
    return this.then((res) => {
        return Promise.resolve(cb()).then(() => {
            return res
        })
    }, (err) => {
        return Promise.resolve(cb()).then(() => {
            throw Error(err)
        })
    })
};

// fn = Promise.resolve(123);

fn = new Promise((resolve, reject) => {
    resolve(new Promise((res) => {
        setTimeout(() => {
            res(100)
        }, 2000)
    }))
})

fn.finally(() => {
    console.log("finally")
}).then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
});