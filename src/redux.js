import reducer from "./reducer";

const createStore = () => {
  let currentState = {
    name: "tony",
    age: 28,
  }; // 公共状态
  let observers = [];
  function getState() {
    return currentState;
  } // getter
  function dispatch(action) {
    //获取最新的数据
    currentState = reducer(currentState, action);
    // 给所有的观察者（订阅人）发送广播，一般这个广播就是用来更新自己的view
    observers.forEach((fn) => fn());
    return currentState;
  } // setter
  function subscribe(fn) {
    // 注册事件（包括打印日志信息，包括更新组织和强制更新组件，不然只能更新store内的数据，view不能更新）
    observers.push(fn);
  } // 发布订阅
  return { getState, dispatch, subscribe };
};

export default createStore;
