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
    // 给所有的观察者（订阅人）发送广播
    observers.forEach((fn) => fn());
    return currentState;
  } // setter
  function subscribe(fn) {
    observers.push(fn);
  } // 发布订阅
  return { getState, dispatch, subscribe };
};

export default createStore;
