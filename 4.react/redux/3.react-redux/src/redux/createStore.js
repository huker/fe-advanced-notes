/**
 * Created by huk on 2019/9/27.
 */

export default function createStore(reducer) {
    let state;
    let listeners = [];

    function getState() {
        return state
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.map(item => item());
    }

    function subscribe(listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter((item) => item !== listener)
        }
    }

    dispatch({ type: '@@REDUX/INIT' });
    return {
        getState,
        dispatch,
        subscribe
    }
}