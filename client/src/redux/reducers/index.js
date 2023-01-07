import { combineReducers } from "redux";
import auth from './authReducer'
import cart from './cartReducer'
import favorite from './favoriteReducer'

export default combineReducers({
  auth,
  cart,
  favorite
});
