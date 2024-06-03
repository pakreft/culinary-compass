// colortheme
import tinycolor from 'tinycolor2';

const accentColor = 'firebrick'; 
const primaryColor = tinycolor(accentColor).lighten(50).desaturate(60).toString();
const secondaryColor = tinycolor(accentColor).lighten(55).desaturate(35).toString();

export default {
  accent: accentColor,
  primary: primaryColor,
  secondary: secondaryColor, 
  iconsGrocery: '#261A20',
  brightest: 'white',
  header: 'silver',
};
