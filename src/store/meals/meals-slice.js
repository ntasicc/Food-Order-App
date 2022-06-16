import { createSlice } from "@reduxjs/toolkit";

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [],
    totalQuantity: 0,
    isLoading: false,
    error: false,
  },
  reducers: {
    addMeals(state, action) {
      state.totalQuantity = action.payload.length;
      state.meals = action.payload;
      state.isLoading = false;
    },
    isLoading(state) {
      state.isLoading = true;
    },

    loadingError(state) {
      state.error = true;
      state.isLoading = false;
    },
  },
});

export const mealsActions = mealsSlice.actions;

export default mealsSlice;
