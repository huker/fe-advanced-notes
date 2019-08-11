/**
 * Created by huk on 2019/8/10.
 */

//中间件 调用自己的koa

const Koa = require('./my-koa/application');

const app = new Koa();

let logger = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("logger")
            resolve()
        }, 1000)
    })
};

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
});

app.use(async (ctx, next) => {
    console.log(3);
    await logger();
    next();
    next();
    console.log(4);
});

app.use((ctx, next) => {
    console.log(5);
    next();
    console.log(6);
});

app.listen(3000);