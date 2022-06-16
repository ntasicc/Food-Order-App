import React from "react";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "./store/cart/cart-actions";
import { fetchUserData } from "./store/auth/auth-actions";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Footer from "./components/Layout/Footer";

let initialRender = true;

const MealDetail = React.lazy(() => import("./components/Pages/MealDetail"));
const Meals = React.lazy(() => import("./components/Pages/Meals"));
const Auth = React.lazy(() => import("./components/Pages/Auth"));
const About = React.lazy(() => import("./components/Pages/About"));

function App() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const cartData = useSelector((state) => state.cart);
  const showCartHandler = () => {
    setShowCart(true);
  };

  const closeCartHandler = () => {
    setShowCart(false);
  };

  useEffect(() => {
    if (initialRender) {
      initialRender = false;
      return;
    }
    sessionStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    //dispatch(fetchCartData());
    dispatch(fetchUserData());
    dispatch({ type: "LOAD_CART" });
    dispatch({ type: "LOAD_MEALS" });
  }, [dispatch]);

  return (
    <>
      {showCart && <Cart onClose={closeCartHandler} />}
      <Header onShowCartClick={showCartHandler} />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/meals" />
            </Route>
            <Route path="/meals" exact>
              <Meals />
            </Route>
            <Route path="/auth" exact>
              <Auth />
            </Route>
            <Route path="/meals/:mealID" exact>
              <MealDetail />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="*" exact>
              <Redirect to="/meals" />
            </Route>
          </Switch>
        </Suspense>
        <Footer></Footer>
      </main>
    </>
  );
}

export default App;
