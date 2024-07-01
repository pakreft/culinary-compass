// colortheme , used in components/SwipeModal
import tinycolor from 'tinycolor2';

const accentColor = '#653c33'; //'firebrick';
const primaryColor = tinycolor(accentColor)
  .lighten(65)
  .desaturate(40)
  .toString();
const secondaryColor = tinycolor(accentColor)
  .lighten(65)
  .desaturate(65)
  .toString();


export default {
  accent: accentColor, //Buttons
  primary: primaryColor, //Background
  secondary: secondaryColor, //groceryItems
  iconsGrocery: '#261A20',
  brightest: 'white',
  header: 'silver',
};
