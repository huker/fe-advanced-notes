const Events = require('events');
const fs = require('fs');

class ReadStream extends Events {
    constructor(path, config) {
        super();
        this.path = path;
        this.flags = config.flags || 'r';
        this.encoding = config.encoding || null;
        this.autoClose = config.autoClose || true;
        this.start = config.start || 0;
        this.end = config.end || undefined;
        this.highWaterMark = config.highWaterMark || 64 * 1024;

        //默认是非流动模式
        this.flowing = null;
        //新建先打开文件
        this.open();

        this.on('newListener', (type) => {
            if (type === 'data') {
                this.flowing = true;
                //开始读取数据
                this.read();
            }
        })
    }

    read() {
        //发布订阅模式 fd没有的时候先触发open事件 回调执行read
        if (typeof this.fd !== 'number') {
            //不能用on 会多次触发open
            return this.once('open', () => this.read())
        }
        // fs.read(this.fd)
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.emit('error', err);
            }
            this.fd = fd;
            this.emit('open', fd);
        })
    }

}

module.exports = ReadStream;