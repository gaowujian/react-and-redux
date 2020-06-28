import React from "react";
import createStore from "./redux";

function App() {
  const store = createStore();
  store.subscribe(() => {
    console.log("组件一订阅了store修改 ");
  });
  store.subscribe(() => {
    console.log("组件二订阅了store修改 ");
  });
  let state = store.getState();
  console.log(state);
  const handleClick = () => {
    const currentState = store.getState();
    state = currentState;
    console.log(currentState);
  };
  const handlePlus = () => {
    const currentState = store.dispatch({ type: "plus" });
    console.log(currentState);
  };
  return (
    <div>
      <h1>{state.name}</h1>
      <h1>{state.age}</h1>
      <button onClick={handlePlus}>年龄++</button>

      <button onClick={handleClick}>获取state</button>
    </div>
  );
}

export default App;
