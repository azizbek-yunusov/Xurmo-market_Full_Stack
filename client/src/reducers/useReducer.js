import { createContext, useReducer } from "react";
export const UserContext = createContext();

const initialState = {
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  order: null,
};

// const initialState = {
//   userInfo: null,
//   order: null,
// };
// const reducer = (state, action) => {
//   if (action.type === "USER") {
//     return { ...action.payload };
//   }
//   if (action.type === "CLEAR") {
//     return null;
//   }
//   return state;
// };
function reducer(state, action) {
  switch (action.type) {
    case "USER":
      return { ...state, userInfo: action.payload };
    case "CLEAR":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <UserContext.Provider value={value}>{props.children} </UserContext.Provider>
  );
}
