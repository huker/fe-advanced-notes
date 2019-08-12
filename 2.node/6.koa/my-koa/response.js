/**
 * Created by huk on 2019/8/6.
 */


let response = {
    _body: null,
    get body() {
        return this._body
    },
    set body(v) {
        this.res.statusCode = 200;
        this._body = v;
    }
};
module.exports = response;