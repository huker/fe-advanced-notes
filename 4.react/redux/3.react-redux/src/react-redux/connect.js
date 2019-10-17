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
            // 累的静态属性 this.context = {store:xxx}
            static contextType = Context;

            constructor(props, context) {
                super(props);
                this.state = mapStateToProps(context.store.getState());
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

            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(() => {
                    this.setState(mapStateToProps(this.context.store.getState()))
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