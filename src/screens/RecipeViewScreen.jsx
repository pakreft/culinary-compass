import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';

import { fetchRecipes, fetchRecipesOnlyURL } from '../api/edamam';
import RecipeCard from '../components/RecipeCard';
import SwipeModal from '../components/SwipeModal';

export default function RecipeViewScreen({ route }) {
  const NUM_LOAD_NEXT = 5;
  const aiScreen = route.params.aiScreen;
  const filters = route.params.filters;
  const uri = route.params.uri;

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [hits, setHits] = useState(route.params.res.hits);
  const [from, setFrom] = useState(route.params.res.to);
  const [fetching, setFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function handleAIAnswer(uri) {
    fetchRecipesOnlyURL(uri)
      .then((res) => {
        setHits((prevHits) => [...prevHits, ...res.hits]);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  function loadMoreRecipes() {
    if (fetching) return;

    setFetching(true);

    if (aiScreen) {
      handleAIAnswer(uri);
      return;
    }

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
        renderItem={({ item: hit }) => (
          <RecipeCard
            recipe={hit.recipe}
            onPress={() => {
              setSelectedRecipe(hit.recipe);
              setModalVisible(true);
            }}
          />
        )}
        onEndReachedThreshold={0.1}
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
      <SwipeModal
        visible={modalVisible}
        onClose={() => {
          setSelectedRecipe(null);
          setModalVisible(false);
        }}
        recipe={selectedRecipe}
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
