import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useSelector } from "react-redux";

const AvailableMeals = () => {
  const mealsList = useSelector((state) => state.meals.meals);
  const error = useSelector((state) => state.meals.error);
  const isLoading = useSelector((state) => state.meals.isLoading);

  const mealsItemList = mealsList?.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.key}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  let content = <ul>{mealsItemList}</ul>;

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  if (error) {
    content = <p>An error occurred!</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
