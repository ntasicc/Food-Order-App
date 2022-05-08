import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart/cart-slice";
import { useHistory } from "react-router-dom";

const MealItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <div className={classes.infoDiv}>
          <h3>{props.name}</h3>
          <button
            className={classes.detailBtn}
            onClick={() => history.push(`/meals/${props.id}`)}
          >
            ?
          </button>
        </div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
