// colortheme , used in components/SwipeModal
import tinycolor from 'tinycolor2';

const accentColor = '#632a1d'; //'firebrick';
const primaryColor = tinycolor(accentColor)
  .lighten(70)
  .desaturate(40)
  .toString();
const secondaryColor = tinycolor(accentColor)
  .lighten(65)
  .desaturate(65)
  .toString();

export default {
  accent: accentColor,
  primary: primaryColor,
  secondary: secondaryColor,
  iconsGrocery: '#261A20',
  brightest: 'white',
  header: 'silver',
};
