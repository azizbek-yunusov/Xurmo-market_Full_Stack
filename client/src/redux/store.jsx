import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import product from "./product";
import order from "./order";
import brand from "./brand/brandSlice";
import category from "./category";
import banner from "./banner";
import post from "./post";
import filter from "./filter";
import address from "./address";
import auth from "./auth";
import favorite from "./favorite";
import cart from "./cart";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    auth,
    cart,
    favorite,
    address,
    product,
    brand,
    category,
    banner,
    post,
    order,
    filter
  },
  devTools: true,
});

function UserProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default UserProvider;
