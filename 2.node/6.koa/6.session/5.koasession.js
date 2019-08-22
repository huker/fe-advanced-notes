/**
 * Created by huk on 2019/8/22.
 */

let koa = require('koa');
let Router = require('koa-router');
let views = require('koa-views');
let path = require('path');
let bodyparser = require('koa-bodyparser');
let session = require('koa-session');

let app = new koa();
let router = new Router();

app.keys = ['huk'];

// 这边通过cookie实现权限
// 但是有时候可能多台服务器 这样的话别的服务器就拿不到数据了
// 可以存到数据库里 但是也无法保证数据不丢失（数据库出问题） 而且共享不方便
// 所以下一个文件使用jwt的方式

router.get('/', async ctx => {
    await ctx.render('login');
});

router.post('/login', async ctx => {
    let { username, password } = ctx.request.body;
    if (username && password) {
        ctx.session.username = username;
        ctx.session.password = password;
        ctx.redirect('/home');
    }
    ctx.body = 'ok';
});

router.get('/home', async ctx => {
    const { username, password } = ctx.session
    if (username && password) {
        await ctx.render('home', {
            username: ctx.session.username
        });
    } else {
        ctx.redirect('/');
    }
});

app.use(session({
    httpOnly: true
}, app));
app.use(views(path.resolve(__dirname, 'views'), {
    map: {
        html: 'ejs'
    }
}));
app.use(bodyparser());
app.use(router.routes());

app.listen(3001);