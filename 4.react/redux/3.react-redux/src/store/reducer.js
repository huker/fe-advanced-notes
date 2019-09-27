import { INCREMENT, DECREMENT } from '../store/types';


const init = {
    count: 0
};

export default function reducer(state = init, action) {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1 };
        case DECREMENT:
            return { count: state.count - 1 };
        default:
            return state
    }
};