import React, { Component } from 'react';
import actions from '../store/actions/counter2';
import { connect } from 'react-redux';

class Counter2 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.count}
                <button onClick={() => this.props.increment(2)}>+</button>
                <button onClick={() => this.props.decrement(1)}>-</button>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return state.counter2
};

let mapDispatchToProps = (dispatch) => ({
    increment(payload){
        dispatch({ type: 'INCREMENT2', payload })
    },
    decrement(payload){
        dispatch({ type: 'DECREMENT2', payload })
    }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter2)

