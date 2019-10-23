/**
 * Created by huk on 2019/10/5.
 */

export  default function combineReducers(reducers) {
    //返回的还是一个reducer函数 返回的是新的状态
    return function (state = {}, action) {
        // 这样做指针就每次都变了 会导致没有变化的组件也重新渲染 所以要稍加优化
        // let nextState = {};
        // for ( let key in reducers ) {
        //     nextState[key] = reducers[key](state[key], action)
        // }

        let nextState = {};
        let hasChanged = false;
        for ( let key in reducers ) {
            let reducer = reducers[key];
            // 老状态
            let previousState = state[key];
            let newState = reducer(previousState, action);
            nextState[key] = newState;
            hasChanged = hasChanged || (newState != previousState);
        }
        // 有一个state改变就返回新的state
        return hasChanged ? nextState : state
    }
}