const product = [];

const productReducer = (state = product, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;