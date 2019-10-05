import * as types from '../types';

const init = {
    count: 0
};

export default function reducer(state = init, action) {
    switch (action.type) {
        case types.INCREMENT2:
            return { ...state, count: state.count + action.payload };
        case types.DECREMENT2:
            return { ...state, count: state.count - action.payload };
        default:
            return state
    }
};