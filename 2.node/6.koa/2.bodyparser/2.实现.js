/**
 * Created by huk on 2019/8/14.
 */

let koa = require('koa');

let app = new koa();

/**
 * 中间件
 * 1.中间执行的逻辑
 * 2.可以在ctx上扩展一些属性或者方法
 * 3.决定是否向下执行
 *
 * 中间件的写法就是返回一个async函数 需要向下执行就调用next
 */

let bodyparser = () => {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = [];
            ctx.req.on('data', (v) => {
                arr.push(v);
            });
            ctx.req.on('end', () => {
                ctx.request.body = Buffer.concat(arr).toString()
                resolve();
            })
        });
        await next(); //不走next就卡死在这边了
    }
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