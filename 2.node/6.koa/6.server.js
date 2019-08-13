//错误处理

const Koa = require('./my-koa/application');
// const Koa = require('koa');

const app = new Koa();
const fs = require('fs');

app.use((ctx, next) => {
    // throw new Error('err!!!')
    //还要做下ctx.body设置的值的类型的兼容
    // ctx.body = {name:'123'}
    ctx.body = fs.createReadStream('./package.json');
});

app.on('error', (err) => {
    console.log(err);
});

app.listen(3000);