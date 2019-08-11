/**
 * Created by huk on 2019/8/10.
 */



//中间件 用法
const Koa = require('koa');
const app = new Koa();

let logger = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("logger")
            resolve()
        }, 1000)
    })
}

app.use(async (ctx, next) => {
    console.time('time');
    console.log(1);
    //等待这个promise执行完毕
    //不加的话这个第一个use的promise就直接成功了 ctx.body还没生效
    await next();
    console.log(2);
    console.timeEnd('time');
});

app.use(async (ctx, next) => {
    console.log(3);
    await logger();
    next();
    console.log(4);
    ctx.body = 'haha';
});

app.use((ctx, next) => {
    console.log(5);
    next();
    console.log(6);
});

app.listen(3000);