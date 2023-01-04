const initialState = {
  // isLogin: localStorage.getItem("firstLogin")
  //   ? JSON.parse(localStorage.getItem("firstLogin"))
  //   : false,
  user: [],
  access_token: "",
  isLogged: false,
  isAdmin: false,
};
// or action
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isLogged: true,
        access_token: action.payload.access_token,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
        isAdmin: action.payload.isAdmin,
      };
    case "ADD_CART": {
      return {
        ...state,
      };
    }
    case "SIGN_OUT": {
      return {
        ...state,
        isLogged: false,
        isAdmin: false,
        user: [],
        access_token: "",
      };
    }
    default:
      return state;
  }
};

export default authReducer;
