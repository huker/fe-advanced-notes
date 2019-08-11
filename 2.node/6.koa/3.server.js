/**
 * Created by huk on 2019/8/6.
 */

//引入自己的koa
// const Koa = require('koa');

const Koa = require('./my-koa/application');

const app = new Koa();

//换回ctx
app.use((ctx) => {
    //都能拿到url
    // console.log(ctx.req.url)
    // console.log(ctx.request.url)
    // console.log(ctx.request.path)
    // console.log(ctx.request.req.url)
    // console.log(ctx.request.req.url)
    console.log(ctx.url)
    console.log(ctx.path)

    ctx.response.body = 'haha1';
    ctx.body = 'haha2';
    console.log(ctx.body);
});

app.listen(3000);