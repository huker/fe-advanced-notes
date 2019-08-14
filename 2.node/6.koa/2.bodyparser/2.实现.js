/**
 * Created by huk on 2019/8/14.
 */

let koa = require('koa');

let app = new koa();

/**
 * 中间件
 * 中间执行的逻辑
 * 可以在ctx上扩展一些属性或者方法
 */

let bodyparser = async () => {
    // await new Promise((resove, reject) => {
    //
    // })
}


app.use(bodyparser());

app.use(async (ctx, next) => {
    if (ctx.path === '/form' && ctx.method === 'GET') {
        ctx.body = `
        <form action="/login" method="post">
        用户名：<Input type="text" name="username" />
        密码：<Input type="text" name="password" />
        <button>提交</button>
</form>  
        `
    } else {
        await next();
    }
})

app.use((ctx, next) => {
    if (ctx.path === '/login' && ctx.method === 'POST') {
        ctx.body = ctx.request.body;
    }
})


app.listen(3001);