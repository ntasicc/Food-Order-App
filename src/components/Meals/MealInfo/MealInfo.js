import classes from "./MealInfo.module.css";
import { useSelector } from "react-redux";

const MealInfo = (props) => {
  const meal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === props.mealID)
  );

  console.log(meal);
  return (
    <>
      {!meal ? (
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
