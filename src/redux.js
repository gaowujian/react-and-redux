// store就是一个小仓库，因为有了闭包，才能保证内部state
// dispatch可以去派发动作，只有规定的动作才能被执行去修改state的状态
// reducer是一个管理员，有三大指责
// 1. 在创建store的时候，用来初始化内部的状态
// 2. 在dispatch接收到动作之后，去解析动作，并做出反应，修改内部状态
// 3. 去触发监听事件

const createStore = (reducer) => {
  let state;
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    //根据action处理state，并返回新的state
    state = reducer(state, action);
    // 给所有的观察者（订阅人）发送广播，一般这个广播就是用来更新自己的view
    listeners.forEach((fn) => fn());
  } // setter
  function subscribe(fn) {
    // 注册事件（包括打印日志信息，包括更新组织和强制更新组件，不然只能更新store内的数据，view不能更新）
    listeners.push(fn);
    // 取消订阅
    return function () {
      listeners = listeners.filter((item) => item !== fn);
    };
  }
  // 用来在创建store的时候，根据传进来的reducer初始化内部的state
  dispatch({ type: "@@REDUX_INIT" });
  return { getState, dispatch, subscribe };
};

export default createStore;
