import * as types from '../types';

function increment(payload) {
    return { type: types.INCREMENT2, payload }
}

function decrement(payload) {
    return { type: types.DECREMENT2, payload }
}


export default { increment, decrement };