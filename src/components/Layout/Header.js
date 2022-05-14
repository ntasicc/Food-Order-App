import classes from "./Header.module.css";
import mealsImg from "../../assets/m5.jpg";
import HeaderCartButton from "./HeaderCartButton";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth/auth-slice";

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const signInHandler = () => {
    history.push("/auth");
  };

  const signOutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  return (
    <>
      <header className={classes.header}>
        <h1>🍣 Mission Sushi</h1>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/meals" activeClassName={classes.active} exact>
                Meals
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName={classes.active}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={classes.buttons}>
          <HeaderCartButton onClick={props.onShowCartClick} />
          <button
            className={classes.logButton}
            onClick={!isLoggedIn ? signInHandler : signOutHandler}
          >
            {!isLoggedIn ? "Sign in" : "Sign out"}
          </button>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of food!" />
      </div>
    </>
  );
};

export default Header;
