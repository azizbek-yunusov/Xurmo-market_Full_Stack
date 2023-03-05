import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const addToCart = (id, access_token) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "USER_PENDING",
    // });
    const { data } = await axios.put(`${baseUrl}addcart/${id}`, null, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "CART_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromCart = (id, access_token) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_PENDING",
    });
    const { data } = await axios.delete(`${baseUrl}cart/${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "CART_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const decrQtyItemCart = (id, access_token) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "USER_PENDING",
    // });
    const { data } = await axios.delete(`${baseUrl}decr/${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "CART_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
