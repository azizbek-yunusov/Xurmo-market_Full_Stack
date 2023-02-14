import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import "./index.css";
import App from "./App";
import "./assets/styles/swipper.css";
import UserProvider from "./redux/store";
import { theme } from "./theme";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>
);
