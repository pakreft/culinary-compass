import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';

import { fetchRecipes } from '../api/edamam';
import RecipeCard from '../components/RecipeCard';

export default function RecipeViewScreen({ route }) {
  const NUM_LOAD_NEXT = 5;
  const filters = route.params.filters;

  const [hits, setHits] = useState(route.params.res.hits);
  const [from, setFrom] = useState(route.params.res.to);
  const [fetching, setFetching] = useState(false);

  function loadMoreRecipes() {
    if (fetching) return;

    setFetching(true);
    const params = {
      from: from,
      to: from + NUM_LOAD_NEXT,
      ...filters,
    };

    fetchRecipes(params)
      .then((res) => {
        setHits((prevHits) => [...prevHits, ...res.hits]);
        setFrom(res.to);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        data={hits}
        numColumns={2}
        renderItem={({ item: hit }) => <RecipeCard recipe={hit.recipe} />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreRecipes}
        ListFooterComponent={
          fetching ? (
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
