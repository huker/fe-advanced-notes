/**
 * Created by huk on 2019/7/9.
 */

//executor 执行器 Promise里的内容是会直接执行的
//状态是不可变的 先走了resolve就不会走reject
//错误都会走reject throw new Error也会

let a = new Promise((resolve, reject) => {
    //111会被打出来
    console.log("111");
    // resolve("ok");
    // reject("no")
    throw new Error('warn!')
})

a.then((data) => {
    console.log("resolve", data)
}, (err) => {
    console.log("reject", err)
})