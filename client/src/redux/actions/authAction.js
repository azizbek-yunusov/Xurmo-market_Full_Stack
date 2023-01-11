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
      dispatch({
        type: "GET_ADDRESS",
        payload: data.user.addresses,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const getUser = (access_token) => async (dispatch) => {
  const { data } = await axios.get("/infor", {
    headers: { Authorization: access_token },
  });
  dispatch({
    type: "GET_USER",
    payload: {
      user: data,
    },
  });
  dispatch({
    type: "SIGN_IN",
    payload: {
      user: data,
      isAdmin: data.admin ? true : false,
    },
  });
};

export const addToCart = (access_token, id) => async (dispatch) => {
  try {
    if (access_token) {
      fetch(`http://localhost:5000/addcart/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
      });
      getUser();
      toast.success("add to cart +1");
    } else {
      toast.error("You must register");
    }
  } catch (error) {
    toast.error(error);
  }
};

export const deleteHandler = async (token, id) => {
  try {
    const { data } = await axios.delete(`/cart/${id}`, {
      headers: { Authorization: token },
    });
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.msg);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signOut = () => async (dispatch) => {
  await axios.get("/logout");
  localStorage.removeItem("firstLogin");
  dispatch({ type: "SIGN_OUT" });
};
