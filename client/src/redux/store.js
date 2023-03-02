import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import product from "./product";
import order from "./order/myOrder";
import brand from "./brand/brandSlice";
import category from "./category";
import banner from "./banner";
import auth from "./reducers/authReducer";
import authv from "./auth";
import me from "./reducers/userReducer";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    auth,
    me,
    product,
    authv,
    order,
    brand,
    category,
    banner,
  },
  devTools: true,
});

function UserProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default UserProvider;
