import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./CheckoutForm/Checkout";
import { useState } from "react";
import useHttp from "../../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart/cart-slice";
import LoadingSpinner from "../UI/LoadingSpinner";

const Cart = (props) => {
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);
  const { isLoading, error, sendRequest: postOrder } = useHttp();
  const totalAmount = useSelector((state) => state.cart.totalPrice).toFixed(2);
  const items = useSelector((state) => state.cart.items);
  const hasItems = items.length > 0;

  const cartItemRemoveHanlder = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const cartItemAddHanlder = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHanlder.bind(null, item.id)}
          onAdd={cartItemAddHanlder.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const submitHandler = async (userData) => {
    dispatch({
      type: "PLACE_ORDER_REQUEST",
      payload: { userData, items, totalAmount },
    });
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && !isLoading && (
        <Checkout onCancel={props.onClose} onConfirm={submitHandler} />
      )}
      {showCheckout && isLoading && <LoadingSpinner />}
      {showCheckout && error && <p>An error occurred!</p>}
      {!showCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
