/**
 * Created by huk on 2019/8/6.
 */

const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const EventEmitter = require('events');

class Koa extends EventEmitter {

    constructor() {
        super();
        //需要Object.create 不影响内部
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn)
    }

    //创建上下文对象
    createContext(req, res) {
        let ctx = this.context;
        ctx.request = this.request;
        ctx.response = this.response;
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx
    }

    compose(ctx) {
        let index = 0;
        //防止多次调用next
        let nextFlag = -1;
        let dispatch = (index) => {
            if (index <= nextFlag) return Promise.reject('multiple call next()');
            nextFlag = index;
            if (index === this.middlewares.length) return Promise.resolve();
            let middleware = this.middlewares[index];
            //中间件可能不是一个promise 如果我们没有await的话
            //但是我们要强行包成一个promise
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
        };

        return dispatch(index);
    }

    //处理请求
    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        //先给状态码设置404 在ctx.body的时候再设成200
        res.statusCode = 404;
        // 需要把存好的middlewares组合起来
        // 组成一个大的promise 成功后end
        this.compose(ctx).then(() => {
            if (ctx.body) {
                return res.end(ctx.body)
            }
            res.end('Not Found');
        }).catch((err) => {
            this.emit('error', err);
        })
    }

    listen() {
        //还是使用http来创建服务
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments);
    }
}

module.exports = Koa;