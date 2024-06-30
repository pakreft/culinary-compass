/**
 * These objects are in edamam api
 */

const diet = [
  'balanced',
  'high-fiber',
  'high-protein',
  'low-carb',
  'low-fat',
  'low-sodium',
];

const health = [
  'alcohol-free',
  'dairy-free',
  'gluten-free',
  'keto-friendly',
  'kidney-friendly',
  'kosher',
  'low-sugar',
  'paleo',
  'peanut-free',
  'pescatarian',
  'pork-free',
  'shellfish-free',
  'soy-free',
  'vegan',
  'vegetarian',
  'wheat-free',
];

const cuisineType = [
  'American',
  'Asian',
  'British',
  'Caribbean',
  'Central Europe',
  'Chinese',
  'Eastern Europe',
  'French',
  'Indian',
  'Italian',
  'Japanese',
  'Kosher',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'South American',
  'South East Asian',
];

const mealType = ['breakfast', 'dinner', 'lunch', 'snack'];

const filters = { diet, health, cuisineType, mealType };

export default filters;
