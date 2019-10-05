/**
 * Created by huk on 2019/10/5.
 */

export  default function combineReducers(reducers) {
    //返回的还是一个reducer函数
    return function (state = {}, action) {
        let nextState = {};
        for ( let key in reducers ) {
            nextState[key] = reducers[key](state[key], action)
        }
        return nextState
    }
}