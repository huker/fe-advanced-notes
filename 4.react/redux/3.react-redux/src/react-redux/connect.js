/**
 *  用法是 connect(mapStateToProps,mapDispatchToProps)(xxx)
 *  返回值还是一个组件
 *  所以是个高阶组件
 */

import React from 'react';
import Context from './Context';
import { bindActionCreators } from '../redux';

export default function (mapStateToProps, mapDispatchToProps) {
    return function (InnerComponent) {
        return class extends React.Component {
            // 类的静态属性 this.context = {store:xxx}
            static contextType = Context;

            constructor(props, context) {
                super(props);
                this.state = this.mapState = mapStateToProps(context.store.getState());
                /**
                 * mapDispatchToProps
                 * 有可能是个函数 也有可能是个对象 所以要判断下
                 */
                if (typeof mapDispatchToProps === 'object') {
                    // 手动绑定
                    this.actions = bindActionCreators(mapDispatchToProps, context.store.dispatch);
                } else if (typeof mapDispatchToProps === 'function') {
                    this.actions = mapDispatchToProps(context.store.dispatch)
                }
            }

            /**
             * update时当前的state和新的mapStateToProps返回的state是否一致
             * 优化渲染的 方法一
             */
            // shouldComponentUpdate() {
            //     // 这边this.state一直是初始的状态 所以永远是不一样的 要重新赋值一个对象来记录老state
            //     let nextState = mapStateToProps(this.context.store.getState());
            //     if (this.mapState === nextState) {
            //         return false
            //     }
            //     this.mapState = nextState
            //     return true
            // }

            /**
             * 优化渲染方式2 可以直接在这边做完 不去考虑shouldupdate
             */
            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(() => {
                    let nextState = mapStateToProps(this.context.store.getState());
                    if (this.mapState !== nextState) {
                        this.mapState = nextState;
                        this.setState(nextState);
                    }
                })
            }

            componentWillUnmount() {
                this.unsubscribe();
            }

            render() {
                return (
                    <InnerComponent {...this.props} {...this.state} {...this.actions}/>
                )
            }
        }
    }
}