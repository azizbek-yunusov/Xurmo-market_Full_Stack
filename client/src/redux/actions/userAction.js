import axios from "axios";
import toast from "react-hot-toast";

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
