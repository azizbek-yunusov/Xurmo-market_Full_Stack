import axios from "axios";

export const getFilterProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      let link = `/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: "GET_ALL_PRODUCTS",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
