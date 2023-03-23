import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import "./index.css";
import "moment/locale/uz-latn";
import "react-lazy-load-image-component/src/effects/blur.css";
import App from "./App";
import "./assets/styles/swipper.css";
import UserProvider from "./redux/store";
import { theme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <GoogleOAuthProvider clientId={"1062466711644-41poj89urjls6ip16t1f3irv1hmhteoo.apps.googleusercontent.com"}>
        <UserProvider>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </UserProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
