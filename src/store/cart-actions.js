import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return (dispatch) => {
    const cartData = JSON.parse(sessionStorage.getItem("cartData"));
    if (cartData) dispatch(cartActions.replaceCart(cartData));
  };
};
