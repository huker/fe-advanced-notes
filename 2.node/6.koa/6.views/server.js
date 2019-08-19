/**
 * Created by huk on 2019/8/19.
 */

//层级路由

const koa = require('koa');
const Router = require('koa-router');
// const views = require('koa-views');
const path = require('path');

const router = new Router();
const app = new koa();

const ejs = require('ejs');
const fs = require('fs');


const views = (url, ops) => {
    return async (ctx, next) => {
        ctx.render = async (pathRender, values) => {
            //promise的结果给body
            ctx.body = await new Promise((resolve, reject) => {
                ejs.renderFile(path.join(url, pathRender + '.html'), values, (err, html) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(html);
                    }
                })
            });
        };
        await next();
    }
};


app.use(views(path.resolve(__dirname, 'views'), {
    map: {
        html: 'ejs'
    }
}));

router.get('/', async (ctx) => {
    await ctx.render('home', {
        title: 'hahaha'
    })
});

app.use(router.routes());

app.listen(3001);