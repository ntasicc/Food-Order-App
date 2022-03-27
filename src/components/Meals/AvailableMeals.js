import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformDataFromHttp = (data) => {
      const loadedMeals = [];

      for (const mealsKey in data) {
        loadedMeals.push({
          id: mealsKey,
          key: mealsKey,
          name: data[mealsKey].name,
          description: data[mealsKey].description,
          price: data[mealsKey].price,
        });
      }

      setMealsList(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://react-test-5a607-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      transformDataFromHttp
    );
  }, [fetchMeals]);

  const mealsItemList = mealsList.map((meal) => (
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
    content = <p>Loading meals...</p>;
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
