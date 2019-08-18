//路由中的每一个层 这样方便扩展
class Layer {
    constructor(pathname, callback, method) {
        this.pathname = pathname;
        this.callback = callback;
        this.method = method;
    }

    match(pathname, method) {
        return (pathname === this.pathname) && (method === this.method)
    }
}


class Router {

    constructor() {
        //路由的规则存放
        this.stacks = [];
    }

    //添加路由
    get(pathname, callback) {
        let layer = new Layer(pathname, callback, 'GET');
        this.stacks.push(layer);
    }

    //中间件调用
    routes() {
        return async (ctx, next) => {
            //过滤出匹配到的stacks 执行他们的callback
            let stack = this.stacks.filter((layer) => {
                return layer.match(ctx.path, ctx.method)
            });
            this.compose(stack, ctx, next);
        }
    }

    //组合 和koa源码中间件那边原理一样
    compose(stack, ctx, next) {
        let index = 0;
        let dispatch = (i) => {
            if (index === stack.length) return next();
            let callback = stack[i].callback;
            return Promise.resolve(callback(ctx, () => dispatch(index + 1)));
        };
        dispatch(index)
    }
}

module.exports = Router;