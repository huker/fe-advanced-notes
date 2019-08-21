/**
 * Created by huk on 2019/8/20.
 */

const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');
const secret = 'huk';


function addSecret(value) {
    //base64有点问题 会导致/ + =这些特殊字符变成了空格 所以要replace掉
    return crypto.createHmac('sha256', secret).update(value + '').digest('base64').replace(/\/|\+|\=/g, '');
}


let server = http.createServer((req, res) => {
    let arr = [];
    res.setCookie = (name, value, ops) => {
        // count=10; httpOnly:true;
        let opsArr = [];
        if (ops && ops.httpOnly) {
            opsArr.push(`httpOnly=true`)
        }
        if (ops && ops.maxAge) {
            opsArr.push(`max-age=${ops.maxAge}`)
        }
        if (ops && ops.signed) {
            //为了安全 不让客户端随便修改 可以加个标识 标识不对应就不能获取数据
            //sha256 加盐算法  更新的内容要是一个字符串
            let sign = addSecret(value);
            value = value + '.' + sign;
        }
        arr.push(`${name}=${value}; ${opsArr.join('; ')}`);
        res.setHeader('Set-Cookie', arr);
    };
    req.getCookie = (key, ops) => {
        let content = querystring.parse(req.headers.cookie, '; ', '=')[key];
        if (content) {
            if (ops && ops.sign) {
                let [value, sign] = content.split('.');
                console.log(value)
                let newSign = addSecret(value);
                if (newSign === sign) {
                    return value
                } else {
                    return ''
                }
            } else {
                return content
            }
        } else {
            return ''
        }
    };
    if (req.url === '/read') {
        res.end(req.getCookie('count', { sign: true }));
    }
    if (req.url === '/write') {
        res.setCookie('count', 10, { httpOnly: true, maxAge: 10000, signed: true });
        res.setCookie('name', 123);
        res.end('finish write');
        return
    }
    res.end('not found');
})

server.listen(3001);