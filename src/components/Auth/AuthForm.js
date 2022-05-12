import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";
import Form from "../UI/Form";
import classes from "./AuthForm.module.css";
import { authActions } from "../../store/auth/auth-slice";
import { useDispatch } from "react-redux";

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest } = useHttp();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const transformDataFromHttp = (data) => {
    dispatch(
      authActions.login({
        expiration: data.expiresIn,
        token: data.idToken,
      })
    );
    history.replace("/");
  };

  const onSubmit = (data) => {
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_AUTH_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_AUTH_KEY}`;
    }
    sendRequest(
      {
        url: url,
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformDataFromHttp
    );
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
