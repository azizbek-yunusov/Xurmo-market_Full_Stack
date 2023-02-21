import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getProduct = createAsyncThunk(
  "product/getByIdProduct",

  async (id, thunkApi) => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`);
      return await response.json();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addReview = createAsyncThunk(
  "product/addReview",
  async ({ access_token, productId, rating, comment }, thunkApi) => {
    try {
      const { data } = await axios.put(
        `${baseUrl}review`,
        {
          productId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      return data.product;
    } catch (error) {
      return console.log(error);
    }
  }
);
const initialState = {
  product: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.payload;
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

export default productSlice.reducer;
