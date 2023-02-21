import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const getProductSlice = createSlice({
  name: "product",
  initialState: { isLoading: false, product: [], error: null },
  reducers: {
    // getProductRequest: (state) => {
    //   state.isLoading = true;
    // },
    // getProductSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.product = action.payload;
    // },
    // getProductFailure: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

export default getProductSlice.reducer;
