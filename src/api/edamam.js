import axios from 'axios';

const APP_ID = process.env.EXPO_PUBLIC_APP_ID;
const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY;

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_V2;
const BASE_URL_URI = process.env.EXPO_PUBLIC_BASE_URL_URI;
const BASE_URL_ASSISTENT = process.env.EXPO_PUBLIC_BASE_URL_ASSISTENT;

/**
 *
 * @param {Object} params An object containing key-value pairs as seen
 * {@link https://developer.edamam.com/edamam-docs-recipe-api here}.
 * Params 'type', 'app_id', 'app_key', 'field' can't be changed.
 *
 * @param {boolean} logURL Wether to log the full URL encoded by axios. Defaults to false.
 *
 * @returns {Object} The response object from api specified
 * {@link https://developer.edamam.com/edamam-docs-recipe-api here} or an error.
 * Access recipes via 'response.hits' and a single one via 'response.hits[x].recipe'.
 * A recipe has the following keys:
 */
export async function fetchRecipes(params, logURL = false) {
  const constantParams = {
    type: 'public',
    app_id: APP_ID,
    app_key: APP_KEY,
    field: [],
  };

  const finalParams = { ...params, ...constantParams };

  if (logURL) logFullURL(finalParams);

  try {
    const response = await axios.get(BASE_URL, {
      params: finalParams,
      paramsSerializer: paramsSerializer,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchRecipesOnlyURL(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchRecipesViaURI(URI, logURL = false) {
  const params = {
    type: 'public',
    app_id: APP_ID,
    app_key: APP_KEY,
  };

  if (logURL) logFullURL(params);
  const url =
    'https://api.edamam.com' +
    URI +
    '&app_id=' +
    APP_ID +
    '&app_key=' +
    APP_KEY +
    '&type=public';

  console.log(url);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Custom serializer to encode arrays correctly.
 */
function paramsSerializer(params) {
  const parts = [];

  for (const key in params) {
    if (Array.isArray(params[key])) {
      // If key is an array, repeat for every element
      params[key].forEach((value) => {
        const encoded = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        parts.push(encoded);
      });
    } else {
      // Otherwise, encode the key-value pair normally
      const encoded = `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
      parts.push(encoded);
    }
  }

  return parts.join('&');
}

function logFullURL(finalParams) {
  const queryString = paramsSerializer(finalParams);
  const fullUrl = `${BASE_URL}?${queryString}`;
  console.log('----- Full URL from axios: ' + fullUrl + ' -----');
}

export async function fetchAnswer(query) {
  const data = {
    options: {
      calls: ['search'],
    },
    exchange: [
      {
        query: query,
      },
    ],
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    auth: {
      username: APP_ID,
      password: APP_KEY,
    },
  };

  try {
    const response = await axios.post(BASE_URL_ASSISTENT, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
