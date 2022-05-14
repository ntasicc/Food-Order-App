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
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          token: action.payload.token,
          expirationTime: action.payload.expiration,
          isLoggedIn: true,
        })
      );
    },
    logout(state) {
      state.token = "";
      state.expirationTime = 0;
      state.isLoggedIn = false;
      sessionStorage.removeItem("user");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
