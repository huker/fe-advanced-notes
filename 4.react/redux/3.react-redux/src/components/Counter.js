import React, { Component } from 'react';
import store from '../store';
import { INCREMENT, DECREMENT } from '../store/types';

export default class Counter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: store.getState().count
        };
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({
                count: store.getState().count
            })
        })
    }

    handleAdd = () => {
        store.dispatch({
            type: INCREMENT
        })
    };

    handleMinus = () => {
        store.dispatch({
            type: DECREMENT
        })
    };

    render() {
        return (
            <div>
                {this.state.count}
                <button onClick={this.handleAdd}>+</button>
                <button onClick={this.handleMinus}>-</button>
            </div>
        )
    }
}

