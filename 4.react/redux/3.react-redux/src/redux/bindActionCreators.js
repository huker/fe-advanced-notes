function bindActionCreator(actionCreator, dispatch) {
    return function (...args) {
        return dispatch(actionCreator(...args))
    }
}

// 可以传一个func也可以传入一个对象
export default function (actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }
    const boundActions = {};
    for ( let key in actionCreators ) {
        boundActions[key] = bindActionCreator(actionCreators[key], dispatch)
    }
    return boundActions
}