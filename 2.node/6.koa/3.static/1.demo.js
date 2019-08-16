/**
 * Created by huk on 2019/8/15.
 */

let koa = require('koa');
const koastatic = require('koa-static');

let app = new koa();

//静态资源
app.use(koastatic(__dirname));

app.listen(3001);