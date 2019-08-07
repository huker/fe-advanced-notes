/**
 * Created by huk on 2019/8/6.
 */

//引入自己的koa

const Koa = require('./my-koa/application');

const app = new Koa();

//先不写ctx 用原本node的
app.use((req, res) => {
    res.end('hello')
});

app.listen(3000);


//koa application.js如下
//
// const http = require('http');
//
// class Koa {
//
//     use(fn) {
//         this.fn = fn;
//     }
//
//     //处理请求
//     handleRequest(req, res) {
//         this.fn(req, res)
//     }
//
//     listen() {
//         //还是使用http来创建服务
//         let server = http.createServer(this.handleRequest.bind(this));
//         server.listen(...arguments);
//     }
// }
//
// module.exports = Koa;
