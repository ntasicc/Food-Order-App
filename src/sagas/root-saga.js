import { spawn } from "redux-saga/effects";
import loginFlow from "./auth-saga";
import { watchLoadCartSaga, watchPlaceOrder } from "./cart-saga";
import { watchFetchMealsSaga } from "./meals-saga";

export default function* rootSaga() {
  yield spawn(watchLoadCartSaga);
  yield spawn(watchFetchMealsSaga);
  yield spawn(loginFlow);
  yield spawn(watchPlaceOrder);
}
