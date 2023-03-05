import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const addToFavorite = (id, access_token) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "USER_PENDING",
    // });
    const { data } = await axios.post(`${baseUrl}fovorite/${id}`, null, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "FAVORITE_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFavoriteItem = (id, access_token) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "USER_PENDING",
    // });
    const { data } = await axios.delete(`${baseUrl}fovorite/${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "FAVORITE_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const cleanWishList = (access_token) => async (dispatch) => {
  try {
    // dispatch({
    //   type: "USER_PENDING",
    // });
    const { data } = await axios.put(`${baseUrl}fovorites`, null, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "FAVORITE_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};