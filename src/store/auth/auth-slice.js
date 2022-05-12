import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    expirationTime: 0,
    isLogedIn: false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.expirationTime = action.payload.expiration;
      state.isLogedIn = true;
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: action.payload.token,
          expirationTime: action.payload.expiration,
          isLogedIn: true,
        })
      );
    },
  },
  logout(state) {
    state.token = "";
    state.expirationTime = 0;
    state.isLogedIn = false;
    localStorage.removeItem("user");
  },
});

export const authActions = authSlice.actions;
export default authSlice;
