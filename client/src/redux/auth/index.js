import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isLogged: false,
  isAdmin: false,
  access_token: "",
  user: [],
};
const backendURL = "http://localhost:5000";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(`${backendURL}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("firstLogin", true);
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const refresh = createAsyncThunk("auth/refresh", async (thunkAPI) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    try {
      const response = await axios.post(`${backendURL}/refreshtoken`, null);
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
});
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.isLoading = false;
      state.isLogged = true;
      state.isAdmin = false;
      state.user = [];
      state.access_token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.isAdmin = action.payload.user.admin ? true : false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogged = false;
        state.error = action.payload.error;
      })
      .addCase(refresh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.isAdmin = action.payload.user.admin ? true : false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogged = false;
        state.error = action.payload.error;
      })
      .addDefaultCase(() => {});
  },
});

export default authSlice.reducer;
