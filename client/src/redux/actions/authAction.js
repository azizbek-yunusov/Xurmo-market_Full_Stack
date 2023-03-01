import axios from "axios";

export const signIn = (formState) => async (dispatch) => {
  try {
    dispatch({ type: "SIGN_IN_PENDING" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/signin", formState, config);
    dispatch({
      type: "SIGN_IN_FULFILLED",
      payload: {
        access_token: data.access_token,
        user: data.user,
        isAdmin: data.user.admin ? true : false,
      },
    });
    localStorage.setItem("firstLogin", true);
    dispatch({ type: "USER_FULFILLED", payload: data.user });
  } catch (err) {
    console.log(err);
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: "REFRESH_PENDING" });
    try {
      const { data } = await axios.post("/refreshtoken", null);
      dispatch({
        type: "REFRESH_FULFILLED",
        payload: {
          access_token: data.access_token,
          user: data.user,
          isAdmin: data.user.admin ? true : false,
        },
      });
      dispatch({ type: "USER_FULFILLED", payload: data.user });
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
