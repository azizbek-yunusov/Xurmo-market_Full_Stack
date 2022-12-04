import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./reducers/useReducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </HelmetProvider>
  </React.StrictMode>
);
