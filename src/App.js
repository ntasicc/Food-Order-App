import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const closeCartHandler = () => {
    setShowCart(false);
  };

  return (
    <>
      {showCart && <Cart onClose={closeCartHandler} />}
      <Header onShowCartClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
