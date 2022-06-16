import {
  take,
  call,
  put,
  cancelled,
  fork,
  cancel,
  apply,
} from "redux-saga/effects";
import { authActions } from "../store/auth/auth-slice";

function* authorize(user, password, login) {
  let url;
  if (login) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_AUTH_KEY}`;
  } else {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_AUTH_KEY}`;
  }
  try {
    const response = yield call(fetch, url, {
      method: "POST",
      body: JSON.stringify({
        email: user,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = yield response.json();
    const expiration = data.expiresIn;
    const token = data.idToken;

    yield put(authActions.login({ token, expiration }));

    yield apply(sessionStorage, sessionStorage.setItem, [
      "user",
      JSON.stringify({
        token: token,
        expirationTime: expiration,
        isLoggedIn: true,
      }),
    ]);
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", error });
  } finally {
    if (yield cancelled()) {
      yield put(authActions.logout());
    }
  }
}

export default function* loginFlow() {
  while (true) {
    const req = yield take("LOGIN_REQUEST");
    const user = req.payload[0];
    const password = req.payload[1];
    const isLogin = req.payload[2];
    const task = yield fork(authorize, user, password, isLogin);
    const action = yield take(["LOGOUT", "LOGIN_ERROR"]);
    if (action.type === "LOGOUT") yield cancel(task);
    yield put(authActions.logout());
    yield apply(sessionStorage, sessionStorage.removeItem, ["user"]);
  }
}
