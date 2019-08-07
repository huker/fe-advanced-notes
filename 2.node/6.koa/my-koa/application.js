/**
 * Created by huk on 2019/8/6.
 */

const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Koa {

    constructor(){
        this.context = Object.create(context);
    }

    use(fn) {
        this.fn = fn;
    }

    createContext(req, res) {

    }

    //处理请求
    handleRequest(req, res) {
        //创建上下文
        let ctx = this.createContext(req, res);
        this.fn(ctx)
    }

    listen() {
        //还是使用http来创建服务
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments);
    }
}

module.exports = Koa;