import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./CheckoutForm/Checkout";
import { useState } from "react";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { isLoading, error, sendRequest: postOrder } = useHttp();
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHanlder = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHanlder = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
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
    await postOrder(
      {
        url: "Firebase url",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { user: userData, orderItems: ctx.items, totalAmount },
      },
      () => {}
    );

    ctx.clearCart();
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitHandler} />
      )}
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
