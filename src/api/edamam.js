import axios from 'axios';

const APP_ID = '6b1aefc7';
const APP_KEY = '69f1c1d39d653ed6acc765ffe0e8adb2';
const BASE_URL = 'https://api.edamam.com/search';

export const getRecipes = async (query) => {
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
