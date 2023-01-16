import { combineReducers } from "redux";
import auth from './authReducer'
import cart from './cartReducer'
import favorites from './favoriteReducer'
import address from './addressReducer'

export default combineReducers({
  auth,
  cart,
  favorites,
  address
});
