/**
 * Created by huk on 2019/8/6.
 */


const fs = require('fs');

let ws = fs.createWriteStream('./a.txt', {
    flag: 'w',
    autoClose: true,
    start: 0,
    highWaterMark: 3
});

//ws.write返回的是还能不能继续写的标识
// let flag = ws.write('12323');

let i = 9;

//没写的会放在缓存区

function write() {
    let flag = true;
    while (i >= 0 && flag) {
        flag = ws.write(i-- + '');
    }
}
write();
//内容达到预期后会触发'drain'
ws.on('drain', () => {
    console.log('drain')
    write()
})