import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";


export const newAddress = (addressData, access_token) => async (dispatch) => {
  try {
    dispatch({
      type: "ADDRESS_PENDING",
    });
    const { data } = await axios.post(`${baseUrl}address`, addressData, {
      headers: {
        Authorization: access_token,
      },
    });
    dispatch({
      type: "ADDRESS_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAddress = (id, access_token) => async (dispatch) => {
  try {
    dispatch({
      type: "ADDRESS_PENDING",
    });
    const { data } = await axios.delete(`${baseUrl}address/${id}`, {
      headers: { Authorization: access_token },
    });
    dispatch({
      type: "ADDRESS_FULFILLED",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};