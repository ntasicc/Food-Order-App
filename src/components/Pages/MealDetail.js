import { useParams } from "react-router-dom";

const MealDetail = () => {
  const params = useParams();
  const { mealID } = params;

  return (
    <>
      <h1>Meal Detail</h1>
      <p>{mealID}</p>
    </>
  );
};

export default MealDetail;
