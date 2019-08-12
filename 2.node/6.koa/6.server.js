//错误处理

const Koa = require('./my-koa/application');
// const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    // throw new Error('err!!!')
    ctx.body = '222'
});

app.on('error', (err) => {
    console.log(err);
});

app.listen(3000);