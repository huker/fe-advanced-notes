/**
 * Created by huk on 2019/8/19.
 */


const http = require('http');

let server = http.createServer((req, res) => {
    if (req.url === '/read') {
        res.end(req.headers.cookie || 'empty');
    }
    if (req.url === '/write') {
        // domain  不能跨域 子域名是可以的
        // path 在某个路径生效 减少cookie传输 默认就是/
        // expires 过期 绝对时间
        // max-age 最大存活时间 相对时间
        // http 是否可以被客户端修改 httpOnly 一般服务端都要设置的 但是还是不够安全 可以加签名

        // 如果客户端不断读取 要续命 比如7天免登陆 就要访问一次再加时间
        // res.setHeader('Set-Cookie', 'count=10; max-age=10');

        //多个可以这样写 数组
        res.setHeader('Set-Cookie', ['count=10', 'name=123']);

        //但是这样写很麻烦 设置很麻烦 取的时候也不方便
        //所以要实现这样的 设置是count=10&name=123 然后取的时候get(...)


        res.end();
        return
    }
    res.end('not found');
})

server.listen(3001);