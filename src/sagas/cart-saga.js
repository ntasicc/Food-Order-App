import { call, put, take, fork, takeEvery } from "redux-saga/effects";
import { cartActions } from "../store/cart/cart-slice";

// export function* addToCartSaga(action) {
//   const [data, newItem] = action.payload;
//   const cartData = { ...data };
//   cartData.totalPrice += newItem.price * newItem.amount;
//   cartData.totalQuantity += newItem.amount;
//   const existingCartItem = cartData.items.find(
//     (item) => item.id === newItem.id
//   );

//   if (!existingCartItem) {
//     cartData.items.push({ ...newItem });
//   } else {
//     existingCartItem.amount += newItem.amount;
//   }

//   yield put(cartActions.replaceCart(cartData));
// }

// export function* watchAddToCartSaga() {
//   yield takeEvery("ADD_TO_CART", addToCartSaga);
// }

export function* loadCart() {
  const cartData = JSON.parse(sessionStorage.getItem("cartData"));
  if (cartData) yield put(cartActions.replaceCart(cartData));
}

export function* watchLoadCartSaga() {
  yield takeEvery("LOAD_CART", loadCart);
}

export function* placeOrder(user, orderItems, totalAmount) {
  try {
    const url = `${process.env.REACT_APP_ORDER_URL}`;
    yield call(fetch, url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, orderItems, totalAmount }),
    });
    yield put(cartActions.clearCart());
  } catch (e) {
    // dispatch an error action
  }
}

export function* watchPlaceOrder() {
  const req = yield take("PLACE_ORDER_REQUEST");
  const user = req.payload.userData;
  const orderItems = req.payload.items;
  const totalAmount = req.payload.totalAmount;
  yield fork(placeOrder, user, orderItems, totalAmount);
}
