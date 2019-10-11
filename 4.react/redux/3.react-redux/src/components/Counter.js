import React, { Component } from 'react';
import actions from '../store/actions/counter1';
import { connect } from 'react-redux';

class Counter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.count}
                <button onClick={() => this.props.increment(3)}>+</button>
                <button onClick={() => this.props.decrement(2)}>-</button>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return state.counter1
};

// 要对action的dispatch简化 actions = bindActionCreators(actions, store.dispatch)
// 达到自动绑定的效果
// 版本1 最原始
// let mapDispatchToProps = (dispatch) => ({
//     increment(payload){
//         dispatch({ type: 'INCREMENT', payload })
//     },
//     decrement(payload){
//         dispatch({ type: 'DECREMENT', payload })
//     }
// });
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Counter)

//版本2
// 直接传入actions connect中可以处理 检查到传入的是对象的话就会手动绑定 bindActionCreators

export default connect(
    mapStateToProps,
    actions
)(Counter)
