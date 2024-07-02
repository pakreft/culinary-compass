import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  Pressable,
  ScrollView,
} from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { useFavorites } from '../contexts/FavoritesContext';
import ShoppingListContext from '../contexts/ShoppingListContext'; /// Von Lennard: Handling, dass Items an die Einkaufliste geschickt werden können
import { useNavigation } from '@react-navigation/native'; //Felix Add
import { closeModal } from '../screens/main/FavoritesScreen';
//import routes from '../constants//routes'; Felix add
const SwipeModal = ({ visible, onClose, recipe }) => {
  const [pan] = useState(new Animated.ValueXY(0, 0));
  const [portions, setPortions] = useState(1);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { addNewItem, newRecipe } = useContext(ShoppingListContext); /// Neuer Code von Lennard
  const [ingredients, setIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  //const { height } = Dimensions.get('window'); doesnt work smoothly

  useEffect(() => {
    if (recipe) {
      setPortions(recipe.yield);
      setIsFavorite(favorites.some((fav) => fav.label === recipe.label));
      setIngredients(recipe.ingredients);
    }
  }, [recipe, favorites]);

  const updateIngredients = (newPortions) => {
    if (recipe) {
      const updatedIngredients = recipe.ingredients.map((ingredient) => {
        const updatedQuantity =
          (ingredient.quantity / recipe.yield) * newPortions;
        const updatedWeight = (ingredient.weight / recipe.yield) * newPortions;
        return {
          ...ingredient,
          quantity: updatedQuantity,
          weight: updatedWeight,
        };
      });
      setIngredients(updatedIngredients);
    }
  };

  const incrementPortions = () => {
    const newPortions = portions + 1;
    setPortions(newPortions);
    updateIngredients(newPortions);
  };

  const decrementPortions = () => {
    const newPortions = portions > 1 ? portions - 1 : 1;
    setPortions(newPortions);
    updateIngredients(newPortions);
  };
  if (!recipe) {
    return null; // Wenn recipe null ist, wird die Modalansicht nicht gerendert
  }

  const nutritionItems = [
    { label: 'Calories', total: Math.round(recipe.calories) },
    ...(recipe.digest
      ? recipe.digest.filter((item) =>
          ['Protein', 'Carbs', 'Fat'].includes(item.label),
        )
      : []),
  ];

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipe);
    } else {
      addFavorite(recipe);
    }
    setIsFavorite(!isFavorite);
  };

  const favoriteIcon = isFavorite ? 'favorite' : 'favorite-outline';

  //diese Zutat an Shopping List uebersenden
  const handlePressIngredient = (ingredient, index) => {
    addNewItem(ingredient, index);
  };

  function roundToMaxOneDecimal(number) {
    if (Number.isInteger(number)) {
      return number;
    } else {
      let roundedNumber = parseFloat(number.toFixed(1));
      return roundedNumber;
    }
  }

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={visible}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: recipe.image }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.imageOverlay} />
          <View style={styles.headerInfo}>
            <View style={styles.favoriteInfo}>
              <Pressable
                onPress={toggleFavorite}
                style={({ pressed }) => [pressed && styles.pressedButton]}
              >
                <MaterialIcons
                  name={favoriteIcon}
                  size={40}
                  color={colors.accent}
                />
              </Pressable>
            </View>
            {recipe.totalTime > 0 && (
              <View style={styles.durationInfo}>
                <MaterialIcons
                  name="timelapse"
                  size={40}
                  color={colors.accent}
                  style={styles.durationIcon}
                />
                <Text style={styles.time}>{recipe.totalTime + ' Min.'}</Text>
                <Text style={styles.vegetarian}>
                  {recipe.healthLabels.includes('Vegetarian')
                    ? 'Vegetarian'
                    : ''}
                </Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.recipeTitle}>{recipe.label}</Text>

        <View style={styles.ingredients}>
          <View style={styles.ingredientsAction}>
            <View style={styles.portionsControl}>
              <Text style={styles.portionsText}>Portions</Text>
              <Pressable
                onPress={decrementPortions}
                style={({ pressed }) => [pressed && styles.pressedButton]}
              >
                <Icon
                  name="remove"
                  size={30}
                  color={colors.brightest}
                  style={{
                    backgroundColor: colors.accent,
                    borderRadius: 40,
                  }}
                />
              </Pressable>
              <Text style={styles.portionsNumber}>{portions}</Text>
              <Pressable
                onPress={incrementPortions}
                style={({ pressed }) => [pressed && styles.pressedButton]}
              >
                <Icon
                  name="add"
                  size={30}
                  color={colors.brightest}
                  style={{
                    backgroundColor: colors.accent,
                    borderRadius: 40,
                  }}
                />
              </Pressable>
            </View>
            <View style={styles.addToShoppingListBtn}>
              <Text style={styles.addToList}>
                Add all to {'\n'}shopping list
              </Text>
              <Pressable
                onPress={
                  () => newRecipe(recipe) // Alle Zutaten zur Einkaufsliste hinzufügen
                }
                style={({ pressed }) => [pressed && styles.pressedButton]}
              >
                <MaterialIcons
                  name="add-shopping-cart"
                  size={25}
                  style={styles.addToShoppingListIcon}
                  color={colors.brightest}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.groceryItems}>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.groceryItem}>
                <Pressable
                  onPress={() => handlePressIngredient(item, index)}
                  style={({ pressed }) => [pressed && styles.pressedButton]}
                >
                  <Text style={styles.groceriesText}>
                    {item.quantity === 0
                      ? 'pinch of'
                      : roundToMaxOneDecimal(item.quantity) + 'x '}
                    {item.measure === '<unit>' || item.measure === null
                      ? ''
                      : item.measure}{' '}
                  </Text>
                  <Text style={styles.groceriesText}>
                    {item.food + ' '}
                    {Math.round(item.weight) === 0
                      ? ''
                      : '(' + Math.round(item.weight) + 'g) '}
                  </Text>
                </Pressable>
                {/* <Text style={styles.groceryText}>{item}</Text> */}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.nutrition}>
          <Text style={styles.nutritionTitle}>Nutrition 1 portion</Text>
          <View style={styles.nutritionItems}>
            {nutritionItems.map((item, index) => (
              <View key={index} style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>
                  {Math.round(item.total / recipe.yield)}
                </Text>
                <Text style={styles.nutritionLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.instructionsButtons}>
          <Pressable
            onPress={() =>
              // if (!isFavorite) {
              //   addFavorite(recipe);
              //   console.log('Added to Favorites');
              // }
              //navigation.navigate('PlannedStack')
              console.log('PLAN')
            }
            //onPress={() => addFavorite()}
            style={({ pressed }) => [
              styles.pressableButton,
              pressed && styles.pressedButton,
            ]}
          >
            <MaterialIcons
              name="calendar-month"
              size={24}
              color={colors.brightest}
            />
            <Text style={styles.buttonText}>Plan</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.pressableButton,
              pressed && styles.pressedButton,
            ]}
          >
            <MaterialIcons
              name="menu-book"
              size={24}
              color={colors.brightest}
            />
            <Text style={styles.buttonText}>Instructions</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.quitButton,
            pressed && styles.pressedButton,
          ]}
          onPress={onClose}
        >
          <MaterialIcons name="close" size={28} color={colors.accent} />
        </Pressable>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primary,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  header: {
    height: 220,
    paddingTop: 20,
  },
  headerInfo: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  recipeTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  durationInfo: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center', //vertikales zentrieren
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  durationIcon: {
    marginRight: 10,
  },
  time: {
    fontSize: 16,
    marginRight: 20,
  },
  vegetarian: {
    fontSize: 16,
  },
  favoriteInfo: {
    padding: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonText: {
    color: colors.brightest,
    marginLeft: 5,
  },
  ingredients: {
    padding: 20,
    backgroundColor: colors.brightest,
  },

  ingredientsAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  portionsText: {
    fontSize: 18,
    paddingRight: 10,
  },
  portionsControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portionsNumber: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  addToList: {
    color: colors.accent,
    textAlign: 'right',
    marginRight: 10,
  },
  addToShoppingListBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToShoppingListIcon: {
    padding: 7,
    borderRadius: 10,
    backgroundColor: colors.accent,
  },
  groceryItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  groceryItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    margin: 3,
    backgroundColor: colors.secondary,
  },
  groceriesText: {
    color: 'black',
    textAlign: 'center',
  },
  nutrition: {
    padding: 20,
  },
  nutritionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  nutritionItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  nutritionItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brightest,
    padding: 10,
    borderRadius: 30,
    width: 80,
    height: 80,
  },
  nutritionLabel: {
    fontSize: 14,
  },
  nutritionValue: {
    fontSize: 24,
  },
  pressableButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    margin: 2,
    width: '50%',
  },
  instructionsButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  quitButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    borderColor: colors.accent,
    borderWidth: 0.5,
    borderRadius: 50,
    padding: 10,
    backgroundColor: colors.brightest,
    marginBottom: 30,
  },
  pressedButton: {
    transform: [{ scale: 0.9 }],
  },
});

export default SwipeModal;
