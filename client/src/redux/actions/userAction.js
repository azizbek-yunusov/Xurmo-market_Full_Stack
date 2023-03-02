import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../utils/baseUrl";

export const updateProfile = (userData, access_token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: access_token,
      },
    };
    const { data } = await axios.put("/me/update", userData, config);
    dispatch({
      type: "GET_USER",
      payload: data.updatedUser,
    });
    toast.success("Update Profile");
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfor = (access_token) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_PENDING",
    });
    const { data } = await axios.get(`${baseUrl}user`, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "USER_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

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
      type: "USER_FULFILLED",
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
      type: "USER_FULFILLED",
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
      type: "USER_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

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
      type: "USER_FULFILLED",
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
      type: "USER_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

