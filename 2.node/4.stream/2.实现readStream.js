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

        this.position = this.start;

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

    //非流动下才有恢复流动之说
    resume() {
        if (!this.flowing) {
            this.flowing = true;
            this.read();
        }
    }

    //暂停
    pause() {
        this.flowing = false;
    }

    read() {
        //发布订阅模式 fd没有的时候先触发open事件 回调执行read
        if (typeof this.fd !== 'number') {
            //不能用on 会多次触发open
            return this.once('open', () => this.read())
        }
        // let buffer = Buffer.alloc(this.highWaterMark);
        let _highWaterMark = this.end ? (Math.min(this.end - this.start - this.position + 1, this.highWaterMark)) : this.highWaterMark;
        let buffer = Buffer.alloc(_highWaterMark);
        fs.read(this.fd, buffer, 0, _highWaterMark, this.position, (err, bytesRead) => {
            if (bytesRead > 0) {
                if (this.flowing) {
                    this.position += bytesRead;
                    //buffer.toString 转编码
                    this.emit('data', this.encoding ? buffer.toString(this.encoding) : buffer);
                    this.read();
                }
            } else {
                this.emit('end', buffer);
                if (this.autoClose) {
                    fs.close(this.fd, () => {
                        this.emit('close');
                    })
                }
            }
        })
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