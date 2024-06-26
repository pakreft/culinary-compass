import axios from 'axios';

const APP_ID = process.env.EXPO_PUBLIC_API_ID;
const APP_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const BASE_URL_V2 = process.env.EXPO_PUBLIC_BASE_URL_V2;

export const getRecipes = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        app_id: APP_ID,
        app_key: APP_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

/**
 *
 * @param {Object} params See {@link https://developer.edamam.com/edamam-docs-recipe-api documentation }
 * for how it's structured. Params 'type', 'app_id', 'app_key' can't be changed.
 * @returns {Object} See {@link https://developer.edamam.com/edamam-docs-recipe-api documentation }
 * for how it's structured.
 */
export async function fetchRecipes(params) {
  const constantParams = {
    type: 'public',
    app_id: APP_ID,
    app_key: APP_KEY,
  };

  try {
    const response = await axios.get(BASE_URL_V2, {
      params: {
        ...params,
        ...constantParams,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}
