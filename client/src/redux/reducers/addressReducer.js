const address = [];

const cartReducer = (state = address, action) => {
  switch (action.type) {
    case "GET_ADDRESS":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;