

// 传入的就是executor 执行器有两个参数 resolve和reject
// 执行器在new promise的时候 是直接运行的

// console.log('0')

const promise = new Promise((resolve, reject) => {
    // console.log('1')
    resolve('1243')
})

// console.log('2')

// promise.then((data)=>{
//     console.log('成功',data)
// },(err)=>{
//     console.log('失败',err)
// })

promise.then((data) => {
    return data
}).then((v) => {
    console.log(v)
    return Promise.resolve('aaaa')
}).then(v => {
    console.log(v)
}).catch((e) => {
    console.log('error', e)
})