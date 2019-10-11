import * as types from '../types';

function increment(payload) {
    return { type: types.INCREMENT, payload }
}

function decrement(payload) {
    return { type: types.DECREMENT, payload }
}


export default { increment, decrement };