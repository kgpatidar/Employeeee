import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider, ReactReduxContext } from "react-redux";

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <App />
  </Provider>,
  document.getElementById("root")
);
