/**
 * Created by huk on 2019/8/22.
 */

const http = require('http');
const querystring = require('querystring');

//就像是到店办卡 第一次进来是办卡，后面进来都是消费
//卡池
let sessions = {};

let cardName = 'huk';
let cardId = 'h12gf12442';

let server = http.createServer((req, res) => {
    if (req.url === '/') {
        let cookie = querystring.parse(req.headers.cookie, '; ');
        let id = cookie[cardName];
        if (id && sessions[id]) {
            sessions[cardId].money -= 10;
            res.end(`last money:${sessions[cardId].money}`)
        } else {
            let user = `${cardName}=${cardId}`;
            sessions[cardId] = { money: 100 };
            res.setHeader('Set-Cookie', user);
            res.end('new card money 100')
        }
    }
    res.end('not found');
})

server.listen(3001);