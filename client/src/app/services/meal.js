import { debugAlert } from "./debugAlert";
import { request } from "./request";

/**
 * CREATE Method
 * Adds a meal
 */
export async function addMeal(mealBody) {
  // Set up request body
  const body = mealBody;

  // Set up request options
  const options = {
    method: "POST",
    body: JSON.stringify(body),
  };

  // Run request
  return await request(`/meal`, options).then((meal) => {
    debugAlert("addMeal-finished");
    window.location.assign(`/meal`);
  });
}

/**
 * READ Method
 * Loads all meals
 */
export async function loadMeals(setMeals) {
  const meals = await request(`/meal`);
  setMeals(meals);
  return meals;
}

/**
 * READ Method
 * Loads all meals
 */
export async function loadSearchedMeals(query, setMeals) {
  const meals = await request(`/meal?name=${query}`);
  setMeals(meals);
  return meals;
}

/**
 * READ Method
 * Loads day meals
 */
export async function loadDayMeals(dayId, setMeals) {
  const meals = await request(`/meal/day-item/${dayId}`);
  setMeals(meals);
  return meals;
}

/**
 * READ Method
 * Loads a meal
 */
export async function loadMeal(id, setMeal) {
  const meal = await request(`/meal/${id}`);
  setMeal(meal);
  return meal;
}

/**
 * UPDATE Method
 * Updates a meal
 */
export async function updateMeal(id, mealBody) {
  // Set up request body
  const body = mealBody;

  // Set up request options
  const options = {
    method: "PATCH",
    body: JSON.stringify(body),
  };

  // Run request
  return await request(`/meal/${id}`, options).then((meal) => {
    debugAlert("updateMeal-finished");
    window.location.assign(`/meal`);
  });
}

/**
 * DELETE Method
 * Deletes a meal
 */
export async function deleteMeal(id) {
  // Set up request options
  const options = {
    method: "DELETE",
  };

  // Run request
  return await request(`/meal/${id}`, options).then((meal) => {
    window.location.assign(`/meal`);
  });
}
