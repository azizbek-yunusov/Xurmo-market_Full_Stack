import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const signInv = createAsyncThunk(
  "auth/sign-in",
  async ({ formState }) => {
    try {
      const { data } = await axios.post(`${baseUrl}signin`, formState);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const refreshV = createAsyncThunk("auth/refresh-token", async () => {
  try {
    // const response = await axios.post(`${baseUrl}refreshtoken`);
    const { data } = await axios.post(`${baseUrl}refreshtoken`, null);
    return data;
  } catch (error) {
    return console.log(error);
  }
});

const initialState = {
  user: [],
  access_token: "",
  isLoading: false,
  isError: false,
  isAdmin: false,
  isSuccess: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.isAdmin = action.payload.user.admin ? true : false;
      })
      .addCase(signInv.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(refreshV.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshV.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.isAdmin = action.payload.user.admin ? true : false;
      })
      .addCase(refreshV.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(() => {});
  },
});

export default authSlice.reducer;
