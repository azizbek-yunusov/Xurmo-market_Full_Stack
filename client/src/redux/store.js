import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import product from "./product";
import order from "./order/myOrder";
import auth from "./reducers/authReducer";
import cart from "./reducers/cartReducer";
import favorites from "./reducers/favoriteReducer";
// import product from "./productReducer";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    product,
    auth,
    cart,
    favorites,
    order
  },
  devTools: true,
});

function UserProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default UserProvider;
