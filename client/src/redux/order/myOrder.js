import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendURL } from "../../utils/baseUrl";

export const getMyOrder = createAsyncThunk(
  "order/getMyOrders",
  // async (id, thunkApi) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000//myorders`);
  //     return await response.json();
  //   } catch (error) {
  //     return thunkApi.rejectWithValue(error.message);
  //   }
  // }
  async ({ access_token }, thunkAPI) => {
    try {
      const response = await fetch(`${backendURL}/myorders`, {
        method: "get",
        headers: {
          Authorization: access_token,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMyOrderSlice = createSlice({
  name: "order",
  initialState: { isLoading: false, orders: [], error: null },
  reducers: {
    // getProductRequest: (state) => {
    //   state.isLoading = true;
    // },
    // getProductSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.orders = action.payload;
    // },
    // getProductFailure: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
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
