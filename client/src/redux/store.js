import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { Provider } from "react-redux";

const store = configureStore({ reducer, devTools: true });

function UserProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default UserProvider;
