import { useParams } from "react-router-dom";
import MealInfo from "../Meals/MealInfo/MealInfo";

const MealDetail = () => {
  const params = useParams();
  const { mealID } = params;

  return (
    <>
      <MealInfo mealID={mealID}></MealInfo>
    </>
  );
};

export default MealDetail;
