import axios from "axios";
import toast from "react-hot-toast";

export const signIn = (email, password) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/signin", { email, password }, config);
    dispatch({
      type: "SIGN_IN",
      payload: {
        access_token: data.access_token,
        user: data.user,
        isAdmin: data.user.admin ? true : false,
      },
    });
    localStorage.setItem("firstLogin", true);
    toast.success(data.msg);
  } catch (err) {
    console.log(err);
  }
};

// Refresh access_token
export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    try {
      const { data } = await axios.post("/refreshtoken", null);
      dispatch({
        type: "SIGN_IN",
        payload: {
          access_token: data.access_token,
          user: data.user,
          isAdmin: data.user.admin ? true : false,
        },
      });
      dispatch({ type: "GET_USER", payload: data.user });
      dispatch({ type: "GET_CART", payload: data.user.cart });
      dispatch({ type: "GET_FAVORITES", payload: data.user.favorites });
      dispatch({
        type: "GET_ADDRESS",
        payload: data.user.addresses,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const signOut = () => async (dispatch) => {
  await axios.get("/logout");
  localStorage.removeItem("firstLogin");
  dispatch({ type: "SIGN_OUT" });
};