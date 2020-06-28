//react-redux.js
import React from "react";
import PropTypes from "prop-types";
export class Provider extends React.Component {
  // 需要声明静态属性childContextTypes来指定context对象的属性,是context的固定写法
  static childContextTypes = {
    store: PropTypes.object,
  };

  // 实现getChildContext方法,返回context对象,也是固定写法
  getChildContext() {
    return { store: this.store };
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  // 渲染被Provider包裹的组件
  render() {
    return this.props.children;
  }
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return function (Component) {
    class Connect extends React.Component {
      componentDidMount() {
        //从context获取store并订阅更新
        this.context.store.subscribe(this.handleStoreChange.bind(this));
      }
      handleStoreChange() {
        // 触发更新
        // 触发的方法有多种,这里为了简洁起见,直接forceUpdate强制更新,读者也可以通过setState来触发子组件更新
        this.forceUpdate();

        // 这种方式也可以，只是为了触发更新，如果不触发更新，我们知道其实store内的值已经改变
        // 如果不触发更新，最新的值就不能通过props传递给自组件
        // this.setState({});
      }
      render() {
        // 在渲染的时候通过getState获取最新的state并通过props传递给子组件
        return (
          <Component
            // 传入该组件的props,需要由connect这个高阶组件原样传回原组件
            {...this.props}
            // 根据mapStateToProps把state挂到this.props上
            {...mapStateToProps(this.context.store.getState())}
            // 根据mapDispatchToProps把dispatch(action)挂到this.props上
            {...mapDispatchToProps(this.context.store.dispatch)}
          />
        );
      }
    }

    //接收context的固定写法
    Connect.contextTypes = {
      store: PropTypes.object,
    };
    return Connect;
  };
}
