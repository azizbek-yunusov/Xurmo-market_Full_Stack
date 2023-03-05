import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getUserInfor = (access_token) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_PENDING",
    });
    const config = {
      headers: {
        Authorization: access_token,
      },
    };
    const { data } = await axios.get(`${baseUrl}user`, config);
    dispatch({
      type: "USER_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editProfile = (userData, access_token) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${baseUrl}update`, userData, {
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

export const uploadAvatar = (avatar, access_token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: access_token,
      },
    };
    const { data } = await axios.put(`${baseUrl}avatar`, { avatar }, config);
    dispatch({
      type: "USER_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

