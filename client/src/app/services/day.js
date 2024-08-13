import { VISIBILITY_RANK } from "../config/config";
import { debugAlert } from "./debugAlert";
import { request } from "./request";

/**
 * CREATE Method
 * Adds a day
 */
export async function addDay(dayBody) {
  // Set up request body
  const body = dayBody;

  // Set up request options
  const options = {
    method: "POST",
    body: JSON.stringify(body),
  };

  // Run request
  return await request(`/day`, options).then((day) => {
    debugAlert("addDay-finished");
    window.location.assign(`/meal-maven/day`);
  });
}

/**
 * READ Method
 * Loads all days
 */
export async function loadDays(visibilityRank, setDays) {
  const days = await request(`/day?visibilityRank=${visibilityRank}`);
  setDays(days);
  return days;
}

/**
 * READ Method
 * Loads all days
 */
export async function loadSearchedDays(visibilityRank, query, setDays) {
  const days = await request(
    `/day?name=${query}&visibilityRank=${visibilityRank}`,
  );
  setDays(days);
  return days;
}

/**
 * READ Method
 * Loads a day
 */
export async function loadDay(id, setDay) {
  const day = await request(`/day/${id}`);
  setDay(day);
  return day;
}

/**
 * UPDATE Method
 * Updates a day
 */
export async function updateDay(id, dayBody) {
  // Set up request body
  const body = dayBody;

  // Set up request options
  const options = {
    method: "PATCH",
    body: JSON.stringify(body),
  };

  // Run request
  return await request(`/day/${id}`, options).then((day) => {
    debugAlert("updateDay-finished");
    window.location.assign(`/meal-maven/day`);
  });
}

/**
 * UPDATE Method
 * Hides a day
 */
export async function hideDay(id, dayBody) {
  const visibilityRank = dayBody.visibilityRank || 1;
  dayBody.visibilityRank = visibilityRank + 1;
  return await updateDay(id, dayBody);
}

/**
 * UPDATE Method
 * Unhides a day
 */
export async function unhideDay(id, dayBody) {
  const visibilityRank = dayBody.visibilityRank || 1;
  dayBody.visibilityRank = visibilityRank - 1;
  return await updateDay(id, dayBody);
}

/**
 * DELETE Method
 * Deletes a day
 */
export async function deleteDay(id) {
  // Set up request options
  const options = {
    method: "DELETE",
  };

  // Run request
  return await request(`/day/${id}`, options).then((day) => {
    window.location.assign(`/meal-maven/day`);
  });
}
