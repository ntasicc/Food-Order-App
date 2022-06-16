import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import cartSlice from "./cart/cart-slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/root-saga";
import mealsSlice from "./meals/meals-slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    meals: mealsSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
