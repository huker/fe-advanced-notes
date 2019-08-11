/**
 * Created by huk on 2019/8/10.
 */


let http = require('http');

let server = http.createServer((req,res)=>{
    // res.body = 'hi';
    res.end('123')
});



server.listen(3000)