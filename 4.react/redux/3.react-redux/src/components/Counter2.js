import React, { Component } from 'react';
import store from '../store';
import * as types from '../store/types';
import { bindActionCreators } from 'redux';

function increment(payload) {
    return { type: types.INCREMENT2, payload }
}

function decrement(payload) {
    return { type: types.DECREMENT2, payload }
}

let actions = { increment, decrement };
actions = bindActionCreators(actions, store.dispatch);

export default class Counter2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: store.getState().counter2.count
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                count: store.getState().counter2.count
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div>
                {this.state.count}
                <button onClick={() => actions.increment(3)}>+</button>
                <button onClick={() => actions.decrement(2)}>-</button>
            </div>
        )
    }
}

