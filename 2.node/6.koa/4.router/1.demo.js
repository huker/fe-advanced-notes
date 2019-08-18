/**
 * Created by huk on 2019/8/18.
 */

let koa = require('koa');
const Router = require('koa-router');
const router = new Router();

let app = new koa();

//路径可以加路径参数 也可以* 也可以正则
router.get('/hello', async (ctx, next) => {
    ctx.body = 'hello';
    next();
});

router.get('/hello', async (ctx, next) => {
    ctx.body = 'hello2';
    next();
});

router.get('/world', async (ctx, next) => {
    ctx.body = 'world';
});

//装载路由
app.use(router.routes());

app.use(async (ctx, next) => {
    ctx.body = '????';
})


app.listen(3001);