import { StyleSheet, Text, View } from 'react-native';

export default function RecipeViewScreen({ route, navigation }) {
  return (
    <View style={styles.screen}>
      <Text>{route.params?.recipes.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ screen: {} });
