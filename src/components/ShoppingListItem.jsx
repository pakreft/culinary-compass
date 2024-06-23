import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShoppingListItem = ({ item, onDelete, onToggleDone, showDeleteButton, mode }) => {
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
          <Text style={styles.itemAmount}>{item.amount}</Text>
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
        <View>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemAmount}>{item.amount}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Done"
              color={item.done ? 'gray' : 'green'}
              onPress={() => onToggleDone(item.id)}
            />
          </View>
          {showDeleteButton && (
            <View style={styles.buttonWrapper}>
              <Button title="Delete" color="red" onPress={() => onDelete(item.id)} />
            </View>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemContainerDone: {
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  itemAmount: {
    fontSize: 14,
    color: '#888',
  },
  iconContainer: {
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    marginLeft: 10,
  },
});

export default ShoppingListItem;