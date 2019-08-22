/**
 * Created by huk on 2019/8/22.
 */

let koa = require('koa');
let Router = require('koa-router');

let app = new koa();
let router = new Router();

//sign  sha1算法签名的 之前签的是值 这边是键值对一起签
app.keys = ['test']

router.get('/read', (ctx) => {
    ctx.body = ctx.cookies.get('name')
})

router.get('/write', (ctx) => {
    ctx.cookies.set('name', 'huk', { signed: true });
    ctx.body = 'ok';
})


app.use(router.routes());

app.listen(3001);