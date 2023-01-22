const user = []

const cartReducer = (state = user, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;