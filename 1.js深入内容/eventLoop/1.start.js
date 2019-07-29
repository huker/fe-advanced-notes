/**
 * Created by huk on 2019/7/27.
 */

/**
 *
 * 1.主栈 2.setTimeout这些会放进一个队列叫做宏任务 3.promise then会放进另一个队列叫做微任务
 *
 * 队列里面是放的异步的callback
 *
 * 主栈清空之后会先清空微任务再清宏任务
 *
 * 主栈执行完后 取一个队列的callback到主栈来执行（抓到主栈然后清空主栈 结束后继续去队列抓callback）
 *
 * 浏览器执行的时候执行script脚本其实就是一个宏任务
 * 所以是先执行宏任务 执行完了清空微任务 然后没东西了就继续去宏任务队列取新的callback执行
 *
 * 宏任务：ui渲染 script脚本 定时器 ajax 事件（onclick这种）
 *
 */


setTimeout(() => {
    console.log(1)
    Promise.resolve().then(() => {
        console.log("then")
    })
})

setTimeout(() => {
    console.log(2)
})

setTimeout(() => {
    console.log(3)
})

console.log(4)