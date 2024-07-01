import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';

import RecipeCard from '../components/RecipeCard';

export default function RecipeViewScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const hits = route.params.res.hits;

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        data={hits}
        numColumns={2}
        renderItem={({ item: hit }) => <RecipeCard recipe={hit.recipe} />}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <View style={{ height: 10 }} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 8,
  },
  list: {},
});
