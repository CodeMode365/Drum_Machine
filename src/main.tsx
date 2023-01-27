import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("drum-machine") as HTMLElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
