const initialState = {
  cart: [],
  isLoading: false,
  isError: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
