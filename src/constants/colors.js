// colortheme , used in components/SwipeModal
import tinycolor from 'tinycolor2';

const accentColor =  '#2f2318'; //'firebrick'; 
const primaryColor = tinycolor(accentColor).lighten(83).desaturate(30).toString();
const secondaryColor = tinycolor(accentColor).lighten(55).desaturate(35).toString();

export default {
  accent: accentColor,
  primary: primaryColor,
  secondary: secondaryColor, 
  iconsGrocery: '#261A20',
  brightest: 'white',
  header: 'silver',
};
