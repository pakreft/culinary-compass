import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  Pressable,
} from "react-native";
import { Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../constants/colors";

const recipeData = {
  title: 'Apple Pie',
  time: '20 Min.',
  vegetarian: 'Vegetarian',
  nutrition: [
    { label: 'Kcal', value: '20' },
    { label: 'Protein', value: '40g' },
    { label: 'Carbs', value: '50g' },
    { label: 'Fat', value: '50g' },
  ],
  groceries: [
    { name: 'egg', type: 'material-community', quantity: '2x', label: 'Eggs' },
    { name: 'apple', type: 'material-community', quantity: '250g', label: 'Apples' },
  ],
};

const { height } = Dimensions.get("window");

const SwipeModal = ({ visible, onClose }) => {
  const [pan] = useState(new Animated.ValueXY(0, 0));
  const [portions, setPortions] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const incrementPortions = () => setPortions(portions + 1);
  const decrementPortions = () => setPortions(portions > 1 ? portions - 1 : 1);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const favoriteIconName = isFavorite ? "favorite" : "favorite-outline";

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > height / 3) {
        onClose();
        pan.setValue({ x: 0, y: 0 });
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Interpolate opacity from pan.y
  const opacity = pan.y.interpolate({
    inputRange: [0, height / 3],
    outputRange: [1, 0.2],
    extrapolate: 'clamp',
  });

  return (
    <Modal animationType="slide" presentationStyle="formSheet" visible={visible}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.modalContainer, { transform: [{ translateY: pan.y }], opacity }]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={styles.recipeTitle}>{recipeData.title}</Text>
              <Pressable onPress={toggleFavorite} style={({ pressed }) => [pressed && styles.pressedButton]}>
                <MaterialIcons name={favoriteIconName} size={35} color={colors.accent} style={{ paddingRight: 15 }} />
              </Pressable>
            </View>
            <View style={styles.info}>
              <MaterialIcons name="timelapse" size={40} color={colors.accent} style={styles.timeBtn} />
              <Text style={styles.time}>{recipeData.time}</Text>
              <Text style={styles.vegetarian}>{recipeData.vegetarian}</Text>
            </View>
          </View>

          <View style={styles.portions}>
            <Text style={styles.portionsText}>Portions</Text>
            <View style={styles.portionsControl}>
              <Pressable onPress={decrementPortions} style={({ pressed }) => [pressed && styles.pressedButton]}>
                <Icon name="remove" size={30} color={colors.brightest} style={{ backgroundColor: colors.accent, borderRadius: 40 }} />
              </Pressable>
              <Text style={styles.portionsNumber}>{portions}</Text>
              <Pressable onPress={incrementPortions} style={({ pressed }) => [pressed && styles.pressedButton]}>
                <Icon name="add" size={30} color={colors.brightest} style={{ backgroundColor: colors.accent, borderRadius: 40 }} />
              </Pressable>
            </View>
          </View>

          <View style={styles.groceries}>
            <View style={styles.groceriesHeader}>
              <Text style={styles.groceriesTitle}>Groceries for 1 Portion</Text>
              <Pressable style={({ pressed }) => [styles.addToShoppingListBtn, pressed && styles.pressedButton]}>
                <Text style={styles.addToList}>Add all to {'\n'}shopping list</Text>
                <MaterialIcons name="add-shopping-cart" size={25} style={styles.addToShoppingListIcon} color={colors.brightest} />
              </Pressable>
            </View>

            <View style={styles.groceryItems}>
              {recipeData.groceries.map((item, index) => (
                <View key={index} style={styles.groceryItem}>
                  <Icon color={colors.text} name={item.name} type={item.type} size={40} />
                  <Text style={styles.groceryText}>{item.quantity} {item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.nutrition}>
            <Text style={styles.nutritionTitle}>Nutrition for 1 Portion</Text>
            <View style={styles.nutritionItems}>
              {recipeData.nutrition.map((item, index) => (
                <View key={index} style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{item.value}</Text>
                  <Text style={styles.nutritionLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.instructionsButtons}>
            <Pressable style={({ pressed }) => [styles.pressableButton, pressed && styles.pressedButton]}>
              <MaterialIcons name="calendar-month" size={24} color={colors.brightest} />
              <Text style={styles.buttonText}>Plan</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.pressableButton, pressed && styles.pressedButton]}>
              <MaterialIcons name="menu-book" size={24} color={colors.brightest} />
              <Text style={styles.buttonText}>Instructions</Text>
            </Pressable>
          </View>
          <Pressable style={({ pressed }) => [styles.quitButton, pressed && styles.pressedButton]} onPress={() => onClose()}>
            <MaterialIcons name="close" size={30} color={colors.accent} />
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: colors.header,
  },
  //ToDo: refactor
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  time: {
    fontSize: 16,
    marginRight: 20,
  },
  timeBtn: {
    bottom: 10,
    marginRight: 10,
  },
  vegetarian: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: colors.brightest,
    marginLeft: 5,
  },
  // ----- Portions -------
  portions: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  portionsText: {
    fontSize: 18,
  },
  portionsControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portionsNumber: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  // ----- Groceries -------
  groceries: {
    //marginBottom: 20,
    padding: 20,
    backgroundColor: colors.brightest,
  },
  groceriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groceriesTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  addToList: {
    color: colors.accent,
    //marginBottom: 10,
    textAlign: 'right',
    marginRight: 10,
  },
  addToShoppingListBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToShoppingListIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    //alignSelf:'flex-end',
    alignItems: 'center',
    padding: 7,
    borderRadius: 10,
    backgroundColor: colors.accent,
  },
  groceryItems: {
    flexDirection: 'row',
  },
  groceryItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 3,
    backgroundColor: colors.secondary,
  },
  groceryText: {
    marginTop: 5,
  },
  // ----- Nutrition -------
  nutrition: {
    padding: 20,
  },
  nutritionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  nutritionItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  nutritionItem: {
    alignItems: 'center',
    backgroundColor: colors.brightest,
    padding: 15,
    borderRadius: 30,
  },
  nutritionValue: {
    fontSize: 18,
  },
  nutritionLabel: {
    fontSize: 14,
  },
  // ----- Buttons -------
  pressableButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    margin: 2,
    width: "50%",
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
    marginTop: 40,
    borderColor: colors.accent,
    borderWidth: 0.5,
    borderRadius: 50,
    padding: 10,
    backgroundColor: colors.brightest,
  },
  pressedButton: {
    transform: [{ scale: 0.9 }],
  },
});

export default SwipeModal;
