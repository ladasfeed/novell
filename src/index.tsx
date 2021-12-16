import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store/state";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        Hallo
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
