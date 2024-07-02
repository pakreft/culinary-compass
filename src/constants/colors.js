// colortheme , used in components/SwipeModal
import tinycolor from 'tinycolor2';

const accentColor = '#653c33'; //'firebrick';
const secondaryAccentColor = '#a55e4e'; // etwas heller
const thirdaccentcolor = '#b5b5b5'; // weiche farbe für den hintergrund allgemein
const lightgreen = '#88c312'; // sanftes grün
const lightred = '#ff4e00';

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
  secondaryAccent:secondaryAccentColor, // Buttons alt

  background: thirdaccentcolor,

  doneButton: lightgreen,
  delButton: lightred,

  primary: primaryColor, //Background
  secondary: secondaryColor, //groceryItems
  iconsGrocery: '#261A20',
  brightest: 'white',
  header: 'silver',
};
