import { useState } from "react";
import { useHistory } from "react-router-dom";

import Card from "../UI/Card";
import Form from "../UI/Form";
import classes from "./AuthForm.module.css";

import { useDispatch } from "react-redux";

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    dispatch({
      type: "LOGIN_REQUEST",
      payload: [data.email, data.password, isLogin],
    });
    history.replace("/");
  };

  return (
    <section className={classes.auth}>
      <Card>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <Form
          onConfirm={onSubmit}
          isSignup={!isLogin}
          isSignin={isLogin}
        ></Form>
        <button
          type="button"
          className={classes.toggle}
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
      </Card>
    </section>
  );
};

export default AuthForm;
