import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import PrimeReact from "primereact/api";

import "primereact/resources/themes/tailwind-light/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "./store";
PrimeReact.ripple = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
