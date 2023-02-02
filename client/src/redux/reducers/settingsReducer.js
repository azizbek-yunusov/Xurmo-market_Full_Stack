const initialState = {
  bordered: true,
};
// or action
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ISBORDERED":
      return {
        ...state,
        bordered: true,
      };
    default:
      return state;
  }
};

export default authReducer;
