/**
 * Created by huk on 2019/8/19.
 */

//层级路由

const koa = require('koa');
const Router = require('koa-router');

const app = new koa();

//第一种：前缀 命名空间
// const router = new Router({ prefix: '/user' });

// router.get('/list', (ctx) => {
//     ctx.body = 'list'
// })
//
// router.get('/detail', (ctx) => {
//     ctx.body = 'detail'
// })
// app.use(router.routes());

//第二种 大路由包含小路由
const rootRouter = new Router();

//这样就可以把这些user路由专门放在一个文件里 分层 解开来了
const userRouter = new Router();

userRouter.post('/list', (ctx) => {
    ctx.body = 'list222'
});

// userRouter.get('/detail', (ctx) => {
//     ctx.body = 'detail222'
// });

rootRouter.use('/user', userRouter.routes())

//允许的方法 上面只配了post 所以get的请求就会报405 method not allowed
app.use(rootRouter.routes()).use(userRouter.allowedMethods());

app.listen(3001);