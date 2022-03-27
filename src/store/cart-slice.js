import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      state.totalPrice += action.payload.price * action.payload.amount;
      const newItem = action.payload;
      state.totalQuantity += action.payload.amount;
      const existingCartItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (!existingCartItem) {
        state.items.push({ ...newItem });
      } else {
        existingCartItem.amount += newItem.amount;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalPrice -= existingItem.price;
      if (existingItem.amount === 1)
        state.items = state.items.filter((item) => item.id !== id);
      else existingItem.amount--;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
