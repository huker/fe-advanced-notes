
Promise.prototype.customFinally = function (callback) {
    return this.then(
        (data) => {
            return Promise.resolve(callback()).then(() => data)
        },
        (err) => {
            return Promise.resolve(callback()).then(() => { throw err })
        }
    )
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(1111)
    }, 1000)
})

p1.customFinally(() => {
    console.log('all go')
    return Promise.reject(2222)
}).then((v) => {
    console.log('data', v)
}).catch((e) => {
    console.log('reason', e)
})