import { combineReducers } from "redux";
import auth from './authReducer'
import cart from './cartReducer'
import favorite from './favoriteReducer'
import address from './addressReducer'

export default combineReducers({
  auth,
  cart,
  favorite,
  address
});
