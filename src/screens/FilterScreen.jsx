import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import filters from '../constants/filters';
import { fetchRecipes } from '../api/edamam';
import MainButton from '../components/MainButton';
import FilterList from '../components/FilterList';
import FilterChip from '../components/FilterChip';
import { routes } from '../constants/routes';

export default function FilterScreen({ navigation }) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [fetching, setFetching] = useState(false);
  const [hits, setHits] = useState([]);

  function getTotalSelectedFiltersCount() {
    let totalCount = 0;
    for (const key in selectedFilters) {
      totalCount += selectedFilters[key].length;
    }
    return totalCount;
  }

  function addFilter(selectedFilters, { categorie, filterKey }) {
    // Create a shallow copy of selectedFilters
    const result = { ...selectedFilters };

    // Check if the categorie exists in selectedFilters
    if (result.hasOwnProperty(categorie)) {
      // Check if filterKey exists in the array
      if (!result[categorie].includes(filterKey)) {
        result[categorie].push(filterKey);
      }
    } else {
      // If categorie doesn't exist, add it with filterKey as the first element
      result[categorie] = [filterKey];
    }

    return result;
  }

  function deleteFilter(selectedFilters, { categorie, filterKey }) {
    // Create a shallow copy of selectedFilters
    const result = { ...selectedFilters };

    // Check if the categorie exists in selectedFilters
    if (result.hasOwnProperty(categorie)) {
      // Filter out the filterKey and assign the result back to the array
      result[categorie] = result[categorie].filter((key) => key !== filterKey);

      // If the array becomes empty after filtering, delete the categorie key from result
      if (result[categorie].length === 0) {
        delete result[categorie];
      }
    }

    return result;
  }

  function updateSelectedFilters({ categorie, filterKey, selected }) {
    const result = { ...selectedFilters };

    if (selected) {
      setSelectedFilters(addFilter(result, { categorie, filterKey }));
    } else {
      setSelectedFilters(deleteFilter(result, { categorie, filterKey }));
    }
  }

  function handleOnPressSearchButton() {
    setFetching(true);
    console.log(selectedFilters);

    fetchRecipes(selectedFilters)
      .then((res) => {
        console.log(res);
        console.log(res.hits);

        setHits(res.hits);
        console.log(res.hits);
        navigation.navigate(routes.recipeViewScreen, {
          recipes: hits,
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  // Determine if MainButton should be disabled
  const isMainButtonDisabled = Object.keys(selectedFilters).length === 0;

  // Determine title based on whether MainButton is disabled
  const mainButtonTitle = isMainButtonDisabled
    ? 'Select Filters to Search'
    : `Search with ${getTotalSelectedFiltersCount()} filter(s)`;

  return (
    <View style={styles.screenContainer}>
      <View style={styles.listContainer}>
        <FilterList
          filters={filters}
          renderItem={({ categorie, filterKey }) => (
            <FilterChip
              title={filterKey}
              categorie={categorie}
              filterKey={filterKey}
              onPress={updateSelectedFilters}
            />
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          title={mainButtonTitle}
          loading={fetching}
          onPress={handleOnPressSearchButton}
          disabled={isMainButtonDisabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 8,
    //backgroundColor: 'red',
  },
  listContainer: {
    flex: 1,
    //backgroundColor: 'blue',
  },
  buttonContainer: {
    //backgroundColor: 'green',
  },
});
