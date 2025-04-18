import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import WatchContextProvider from "./context/WatchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WatchContextProvider>
      <App />
    </WatchContextProvider>
  </BrowserRouter>
);
