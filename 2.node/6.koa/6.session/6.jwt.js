/**
 * Created by huk on 2019/8/25.
 */

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const kstatic = require('koa-static');
const jwt = require('jwt-simple');
const app = new Koa();
let router = new Router();
const sercet = 'huk';
const crypto = require('crypto');


router.post('/login', async (ctx) => {
    let body = ctx.request.body;
    //签名的时候最好不要放敏感信息 可以放唯一标识 比如用户的id
    ctx.body = jwt.encode(body, sercet, 'HS256')
});

router.get('/valid', async (ctx) => {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1ayIsInBhc3N3b3JkIjoxMjM0NTZ9.nJKjaoISIBpmlHWfXQlZr1MJH2CW4oVOquBPvTiK1QU';
    ctx.body = jwt.decode(token, sercet);
});

app.use(bodyParser());
app.use(kstatic(__dirname));
app.use(router.routes());
app.listen(3001);