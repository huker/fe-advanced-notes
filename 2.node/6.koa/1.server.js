/**
 * Created by huk on 2019/8/6.
 */


//尝试一下

const Koa = require('koa');
const app = new Koa();

/**
 * koa几个内部的方法 app.use app.listen app.on('error',)
 */

//如果app什么逻辑都没有就404

app.use((ctx) => {
    ctx.body = "ahhaha";
});


app.listen(3000);
