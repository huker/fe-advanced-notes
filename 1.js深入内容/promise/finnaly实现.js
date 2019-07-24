/**
 * Created by huk on 2019/7/23.
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

fn = Promise.resolve(123);

fn.finally(() => {
    console.log("finally")
}).then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
});