import React from 'react';
import { Card, Text } from 'react-native-elements';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const RecipeCard = ({ recipe, onPress }) => {
  //({ recipe = {}, onPress = () => {}  })  }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.pressedButton,
      ]}
    >
      <Card containerStyle={styles.card}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <Text style={styles.label}>{recipe.label}</Text>

        <View style={styles.durationInfo}>
          <MaterialIcons
            name="timelapse"
            size={20}
            color={colors.accent}
            style={styles.durationIcon}
          />
          <Text style={styles.time}>
            {recipe.totalTime === 0 ? 'n/a' : recipe.totalTime + ' Min.'}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  card: {
    borderRadius: 30,
    overflow: 'hidden',
    padding: 0, // Remove card padding to make the image and other elements fit properly
  },
  image: {
    height: 150, // Set a fixed height for the image
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  label: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    flex: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  durationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,

    padding: 5,
  },
  time: {
    marginLeft: 5,
    color: colors.accent,
  },
  pressedButton: {
    transform: [{ scale: 0.95 }],
  },
});

export default RecipeCard;
