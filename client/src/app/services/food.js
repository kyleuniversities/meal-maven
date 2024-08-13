import { VISIBILITY_RANK } from "../config/config";
import { debugAlert } from "./debugAlert";
import { request } from "./request";

/**
 * CREATE Method
 * Adds a food
 */
export async function addFood(foodBody) {
  // Set up request body
  const body = foodBody;

  // Set up request options
  const options = {
    method: "POST",
    body: JSON.stringify(body),
  };

  // Run request
  return await request(`/food`, options).then((food) => {
    debugAlert("addFood-finished");
    window.location.assign(`/meal-maven`);
  });
}

/**
 * READ Method
 * Loads all foods
 */
export async function loadFoods(visibilityRank, setFoods) {
  const foods = await request(`/food?visibilityRank=${visibilityRank}`);
  setFoods(foods);
  return foods;
}

/**
 * READ Method
 * Loads all foods
 */
export async function loadMealFoods(mealId, setFoods) {
  const foods = await request(`/food/meal-item/${mealId}`);
  setFoods(foods);
  return foods;
}

/**
 * READ Method
 * Loads all foods
 */
export async function loadSearchedFoods(visibilityRank, query, setFoods) {
  const foods = await request(
    `/food?name=${query}&visibilityRank=${visibilityRank}`,
  );
  setFoods(foods);
  return foods;
}

/**
 * READ Method
 * Loads a food
 */
export async function loadFood(id, setFood) {
  const food = await request(`/food/${id}`);
  setFood(food);
  return food;
}

/**
 * UPDATE Method
 * Updates a food
 */
export async function updateFood(id, foodBody) {
  // Set up request body
  const body = foodBody;

  // Set up request options
  const options = {
    method: "PATCH",
    body: JSON.stringify(body),
  };

  // Run request
  return await request(`/food/${id}`, options).then((food) => {
    debugAlert("updateFood-finished");
    window.location.assign(`/meal-maven`);
  });
}

/**
 * UPDATE Method
 * Hides a food
 */
export async function hideFood(id, foodBody) {
  const visibilityRank = foodBody.visibilityRank || 1;
  foodBody.visibilityRank = visibilityRank + 1;
  return await updateFood(id, foodBody);
}

/**
 * UPDATE Method
 * Unhide a food
 */
export async function unhideFood(id, foodBody) {
  const visibilityRank = foodBody.visibilityRank || 1;
  foodBody.visibilityRank = visibilityRank - 1;
  return await updateFood(id, foodBody);
}

/**
 * DELETE Method
 * Deletes a food
 */
export async function deleteFood(id) {
  // Set up request options
  const options = {
    method: "DELETE",
  };

  // Run request
  return await request(`/food/${id}`, options).then((food) => {
    window.location.assign(`/meal-maven`);
  });
}
