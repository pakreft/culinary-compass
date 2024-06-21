import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const ShoppingListItem = ({ item, onDelete, onToggleDone }) => (
  <TouchableOpacity style={styles.itemContainer}>
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
      <View style={styles.buttonWrapper}>
        <Button title="Löschen" color="red" onPress={() => onDelete(item.id)} />
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
  },
  itemAmount: {
    fontSize: 14,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    marginLeft: 10,
  },
});

export default ShoppingListItem;
