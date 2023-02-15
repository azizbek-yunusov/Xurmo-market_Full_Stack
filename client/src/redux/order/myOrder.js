import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMyOrder = createAsyncThunk(
  "order/getMyOrders",
  async (access_token, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/myorders", {
        headers: {
          Authorization: access_token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMyOrderSlice = createSlice({
  name: "order",
  initialState: { isLoading: false, orders: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

export default getMyOrderSlice.reducer;
