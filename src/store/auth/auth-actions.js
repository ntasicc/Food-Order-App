import { authActions } from "./auth-slice";

export const fetchUserData = () => {
  return (dispatch) => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) dispatch(authActions.login(userData));
  };
};
