import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    expirationTime: 0,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.expirationTime = action.payload.expiration;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = "";
      state.expirationTime = 0;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
