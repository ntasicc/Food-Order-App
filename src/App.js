import React from "react";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "./store/cart/cart-actions";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

let initialRender = true;

const MealDetail = React.lazy(() => import("./components/Pages/MealDetail"));
const Meals = React.lazy(() => import("./components/Pages/Meals"));

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
  }, [cartData.items]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <>
      {showCart && <Cart onClose={closeCartHandler} />}
      <Header onShowCartClick={showCartHandler} />
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/meals" />
            </Route>
            <Route path="/meals" exact>
              <Meals />
            </Route>
            <Route path="/meals/:mealID" exact>
              <MealDetail />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}

export default App;
