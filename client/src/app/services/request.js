import { debugAlert } from "./debugAlert";

// Default api hosts for requests
export const DEFAULT_HOST = "http://localhost:8080/api";
export const DEVELOPMENT_HOST = "http://localhost:8080/api";
export const NULL_TOKEN = "";

/**
 * Utility function for finding the api host
 */
export const deriveApiHost = () => {
  if (process.env["REACT_APP_IS_DEVELOPING"] === "true") {
    return DEVELOPMENT_HOST;
  }
  return process.env["REACT_APP_API_FULL_HOST"] || DEFAULT_HOST;
};

/**
 * Utility function used for api request to the backend
 */
export const request = async (url, options = {}) => {
  // Set up headers
  const headers = collectHeaders(options);

  // Set up API request parameters
  const fullOptions = {
    ...options,
    headers,
  };

  // Set up headers
  return requestWithFullOptions(url, fullOptions);
};

/**
 * Utility function used for api request to the backend
 */
export const requestWithFullOptions = async (url, fullOptions) => {
  // Set up full url
  const apiHost = deriveApiHost();
  const fullUrl = `${apiHost}${url}`;

  // Set up headers
  return fullRequest(fullUrl, fullOptions);
};

/**
 * Utility function used for api request to the backend
 */
export const requestWithFullUrl = async (fullUrl, options = {}) => {
  // Set up headers
  const headers = collectHeaders(options);

  // Set up API request parameters
  const fullOptions = {
    ...options,
    headers,
  };

  // Set up headers
  return fullRequest(fullUrl, fullOptions);
};

/**
 * Utility function used for api request to the backend including the api host
 */
export const fullRequest = async (fullUrl, fullOptions) => {
  // Debug check request and parameters
  debugAlert(`REQUEST: ("${fullOptions.method || "GET"}", "${fullUrl}")`);
  debugAlert(`OPTIONS: ${JSON.stringify(fullOptions)}`);

  // Run API request
  return fetch(fullUrl, fullOptions)
    .then((data) => data.json())
    .then((data) => {
      // Debug check response data
      debugAlert(`DATA: ${JSON.stringify({ url: fullUrl, data })}`);

      // Return the data from the response
      return data;
    });
};

// Function for deriving request headers
const collectHeaders = (options) => {
  // Set up headers
  const headers = {
    "Content-Type": "application/json",
  };

  // Add bearer to headers if it is within options
  if ("bearer" in options && options.bearer !== NULL_TOKEN) {
    headers["Authorization"] = `Bearer ${options.bearer}`;
  }

  // Return collected headers
  return headers;
};
