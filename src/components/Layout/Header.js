import classes from "./Header.module.css";
import mealsImg from "../../assets/m5.jpg";
import HeaderCartButton from "./HeaderCartButton";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Mission Sushi</h1>
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
        <HeaderCartButton onClick={props.onShowCartClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of food!" />
      </div>
    </>
  );
};

export default Header;
