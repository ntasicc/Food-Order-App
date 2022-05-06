import useHttp from "../../../hooks/use-http";
import { useEffect, useState } from "react";
import classes from "./MealInfo.module.css";

const MealInfo = (props) => {
  const [meal, setMeal] = useState([]);
  const { isLoading, error, sendRequest: fetchMeal } = useHttp();

  useEffect(() => {
    const transformDataFromHttp = (data) => {
      const loadedMeal = {
        id: data,
        key: data,
        name: data.name,
        description: data.description,
        price: data.price,
        summary: data.summary,
        image: data.image,
        energy: data.energy,
        totalFat: data.totalFat,
        satFat: data.satFat,
        salt: data.salt,
        sugars: data.sugars,
        allergy: data.allergy,
      };
      setMeal(loadedMeal);
    };

    fetchMeal(
      {
        url: `https://react-test-5a607-default-rtdb.europe-west1.firebasedatabase.app/meals/${props.mealID}.json`,
      },
      transformDataFromHttp
    );
  }, [fetchMeal]);

  return (
    <>
      {error ? (
        <div>Meal does not exist.</div>
      ) : (
        <div className={classes.mealInfo}>
          <section className={classes.summary}>
            <h2>{meal.name}</h2>
            <p>{meal.summary}</p>
            <div className={classes.imgContainer}>
              <img src={meal.image} alt={meal.name}></img>
            </div>
          </section>
          <section className={classes.nutrition_allergy}>
            <h1>Nutritional & allergy information</h1>
            <div className={classes.nutrition}>
              <h3>Nutrition (per serving)</h3>
              <p>Each plate = one serving</p>
              <ul>
                <li>
                  <h4>Energy</h4>
                  <p>{meal.energy}</p>
                </li>
                <li>
                  <h4>Total Fat</h4>
                  <p>{meal.totalFat}</p>
                </li>
                <li>
                  <h4>Sat Fat</h4>
                  <p>{meal.satFat}</p>
                </li>
                <li>
                  <h4>Sugars</h4>
                  <p>{meal.sugars}</p>
                </li>
                <li>
                  <h4>Salt</h4>
                  <p>{meal.salt}</p>
                </li>
              </ul>
            </div>
            <div className={classes.allergy}>
              <h3>Allergens*</h3>
              <p>{meal.allergy}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default MealInfo;
