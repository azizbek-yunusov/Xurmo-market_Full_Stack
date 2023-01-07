const favorites = [];

const favoriteReducer = (state = favorites, action) => {
  switch (action.type) {
    case "GET_FAVORITES":
      return action.payload;
    default:
      return state;
  }
};

export default favoriteReducer;
