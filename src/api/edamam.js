import axios from 'axios';

const APP_ID = process.env.EXPO_PUBLIC_APP_ID;
const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_V2;

/**
 * Encodes the params given to 'fetchRecipes' correctly.
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

/**
 *
 * @param {Object} params See 'Recipe Search' in {@link https://developer.edamam.com/edamam-docs-recipe-api documentation }
 * for how it's structured. Params 'type', 'app_id', 'app_key' can't be changed.
 * @returns {Object} See 'Respone' in {@link https://developer.edamam.com/edamam-docs-recipe-api documentation }
 * for how it's structured.
 */
export async function fetchRecipes(params) {
  const constantParams = {
    type: 'public',
    app_id: APP_ID,
    app_key: APP_KEY,
  };

  const finalParams = { ...params, ...constantParams };

  //logFullURL(finalParams);

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

function logFullURL(finalParams) {
  const queryString = paramsSerializer(finalParams);
  const fullUrl = `${BASE_URL_V2}?${queryString}`;
  console.log('----- Full URL from axios: ' + fullUrl + ' -----');
}
