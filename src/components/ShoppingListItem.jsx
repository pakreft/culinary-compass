import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors'; // Import the colors

const ShoppingListItem = ({ item, onToggleDone, onDelete, mode }) => {
  const renderAmount = () => {
    if (item.amount !== null) {
      return `${item.amount}${item.measurement}`;
    } else if (item.count !== null) {
      return `${item.count} ${item.measurement}`;
    }
    return '';
  };

  if (mode === "shopping") {
    return (
      <TouchableOpacity 
        style={[
          styles.itemContainer, 
          item.done && styles.itemContainerDone
        ]} 
        onPress={() => onToggleDone(item.id)}
      >
        <View style={styles.itemInfo}>
          <Text style={[styles.itemText, item.done && styles.itemTextDone]}>{item.name}</Text>
          <Text style={styles.itemAmount}>{renderAmount()}</Text>
        </View>
        <View style={styles.iconContainer}>
          {item.done ? (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          ) : (
            <Ionicons name="ellipse-outline" size={24} color="#ccc" />
          )}
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemAmount}>{renderAmount()}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, item.done ? styles.buttonDone : styles.buttonNotDone]}
            onPress={() => onToggleDone(item.id)}
          >
            <Text style={styles.buttonText}>{item.done ? 'Undo' : 'Done'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonDelete]}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 10, // added for rounded corners
    marginVertical: 5, // added to create spacing between items
  },
  itemContainerDone: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10, // ensure done items also have rounded corners
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    color: '#fff'
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  itemAmount: {
    fontSize: 14,
    color: '#fff',
  },
  iconContainer: {
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonNotDone: {
    backgroundColor: 'green',
  },
  buttonDone: {
    backgroundColor: 'gray',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default ShoppingListItem;