import { createStore } from 'redux'

const inputEle = document.getElementById('inputEle');
const addEle = document.getElementById('addEle');
const minusEle = document.getElementById('minusEle');

addEle.addEventListener('click', () => {
    store.dispatch({
        type: ADD
    })
})

minusEle.addEventListener('click', () => {
    store.dispatch({
        type: MINUS
    })
})

const ADD = 'ADD';
const MINUS = 'MINUS';
let init = {
    count: 0
};

let reducer = (state = init, action) => {
    switch (action.type) {
        case ADD:
            return { count: state.count + 1 };
        case MINUS:
            return { count: state.count - 1 };
        default:
            return state
    }
};

let store = createStore(reducer);

function render() {
    inputEle.innerHTML = store.getState().count
}

store.subscribe(render);

render();

