/**
 * Created by huk on 2019/7/25.
 */

/**
 * node模块化是靠同步的方式 读取文件（同步就别的事儿都在这之后做了）
 * webpack也是的 读取模块把模块放在一个对象里
 *
 * 1.引入的时候可能是没有后缀的 所以我们要自己加后缀判断这个文件是否存在
 *   后缀：js和json
 * 2.不同的模块有不同的处理方式 所以加一个Module的类
 */
let fs = require('fs');
let path = require('path');
let vm = require('vm');

function Module(id) {
    this.id = id;
    //返回的module.exports其实就是实例的exports对象 加载的模块挂在里面
    this.exports = {};
}
//缓存模块
Module.cache = {};

Module.prototype.load = function () {
    //后缀
    let ext = path.extname(this.id);
    Module.extensions[ext](this);
};

//对不同扩展名文件的处理都放在这儿
Module.extensions = {
    '.js'(){
    },
    '.json'(module){
        let con = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(con);
    }
};

function myrequire(filePath) {
    let _path = path.resolve(__dirname, filePath);
    let _finalPath = '';
    try {
        fs.accessSync(_path);
        _finalPath = _path;
    } catch (e) {
        //没找到 需要匹配后缀
        let extensionKeys = Object.keys(Module.extensions);
        extensionKeys.some((ext) => {
            let url = _path + ext;
            try {
                fs.accessSync(url);
                _finalPath = url;
                return true
            } catch (err) {
                return false
            }
        });
    }
    if (_finalPath) {
        //先从缓存中查找
        if (Module.cache[_finalPath]) {
            console.log("走了缓存")
            return Module.cache[_finalPath].exports
        } else {
            console.log("开始创建模块");
            //1.创建模块
            let module = new Module(_finalPath);
            //4.缓存起来模块
            Module.cache[_finalPath] = module;
            //2.加载模块
            module.load();
            //3.返回module.exports
            return module.exports
        }
    } else {
        throw Error("没找到文件")
    }
}

//加了缓存之后 第二次引入就不会重新加载模块了
let res = myrequire('./1');
let res2 = myrequire('./1');

console.log(res);