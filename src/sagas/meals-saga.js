import { call, put, take, fork } from "redux-saga/effects";
import { mealsActions } from "../store/meals/meals-slice";

function transformMealsData(data) {
  const loadedMeals = [];

  for (const key in data) {
    loadedMeals.push({
      id: key,
      key: key,
      name: data[key].name,
      description: data[key].description,
      price: data[key].price,
      allergy: data[key].allergy,
      energy: data[key].energy,
      image: data[key].image,
      salt: data[key].salt,
      satFat: data[key].satFat,
      sugars: data[key].sugars,
      summary: data[key].summary,
      totalFat: data[key].totalFat,
    });
  }

  return loadedMeals;
}

export function* fetchMealsSaga() {
  yield put(mealsActions.isLoading());
  const url = `${process.env.REACT_APP_MEAL_URL}`;
  const response = yield call(fetch, url);
  if (!response.ok) {
    yield put(mealsActions.loadingError());
  }
  const meals = yield response.json();
  const loadedMeals = transformMealsData(meals);

  yield put(mealsActions.addMeals(loadedMeals));
}

export function* watchFetchMealsSaga() {
  yield take("LOAD_MEALS");
  yield fork(fetchMealsSaga);
}
