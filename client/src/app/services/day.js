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
    window.location.assign(`/day`);
  });
}

/**
 * READ Method
 * Loads all days
 */
export async function loadDays(setDays) {
  const days = await request(`/day`);
  setDays(days);
  return days;
}

/**
 * READ Method
 * Loads all days
 */
export async function loadSearchedDays(query, setDays) {
  const days = await request(`/day?name=${query}`);
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
    window.location.assign(`/day`);
  });
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
    window.location.assign(`/day`);
  });
}
