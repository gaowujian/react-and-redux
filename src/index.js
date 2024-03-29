//index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "./react-redux";
import { createStore } from "./store";
import { reducer } from "./reducer";

let store = createStore(reducer);
function logger(store) {
  let next = store.dispatch;
  return (action) => {
    console.log("logger1");
    let result = next(action);
    console.log(result);

    // return result;
  };
}

function thunk(store) {
  let next = store.dispatch;
  return (action) => {
    console.log("thunk");
    return typeof action === "function" ? action(store.dispatch) : next(action);
  };
}

function logger2(store) {
  let next = store.dispatch;
  return (action) => {
    console.log("logger2");
    let result = next(action);
    // console.log(result);
    return result;
  };
}

function applyMiddleware(store, middlewares) {
  middlewares = [...middlewares];
  middlewares.reverse();
  middlewares.forEach((middleware) => {
    const result = middleware(store);
    console.log(result);
    store.dispatch = result;
  });
}

applyMiddleware(store, [logger, thunk, logger2]);
console.log(store.dispatch);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
