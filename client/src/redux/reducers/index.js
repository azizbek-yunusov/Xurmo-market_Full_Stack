import { combineReducers } from "redux";
import auth from "./authReducer";
import cart from "./cartReducer";
import favorites from "./favoriteReducer";
import address from "./addressReducer";
import user from "./userReducer";
import product from "./productReducer";

export default combineReducers({
  auth,
  cart,
  favorites,
  address,
  user,
  product,
});
