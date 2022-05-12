import { useState } from "react";
import Form from "../../UI/Form";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  return (
    <>
      <Form
        onConfirm={props.onConfirm}
        isCheckout={true}
        onCancel={props.onCancel}
      ></Form>
    </>
  );
};

export default Checkout;
