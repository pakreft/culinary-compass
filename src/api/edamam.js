import axios from 'axios';

const APP_ID = process.env.EXPO_PUBLIC_API_ID;
const APP_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

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
