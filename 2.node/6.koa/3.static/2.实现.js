let koa = require('koa');
let path = require('path');
let fs = require('fs').promises;

let app = new koa();


//中间件首先肯定是个函数 因为可以传参


let koastatic = (dirname) => {
    return async (ctx, next) => {
        try {
            //文件路径
            let pathname = path.join(dirname, ctx.path);
            //文件属性
            let statObj = await fs.stat(pathname);
            if (statObj.isDirectory()) {
                //找到是文件夹
                pathname = path.join(pathname, 'index.html');
            }
            ctx.body = await fs.readFile(pathname, 'utf8')
        } catch (e) {
            // 自己无法处理的交给下面的人处理 因为下面的处理可能也是异步的
            // 所以不加await的话会直接not found
            console.log(e);
            await next()
        }
    }
}

//静态资源
app.use(koastatic(__dirname));

app.listen(3001);