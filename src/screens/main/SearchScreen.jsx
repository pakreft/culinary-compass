import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState } from 'react';

import DefaultSearchBar from '../../components/DefaultSearchBar';
import MainButton from '../../components/MainButton';
import { fetchAnswer, fetchRecipesViaURI } from '../../api/edamam';
import { routes } from '../../constants/routes';
import colors from '../../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  function onSubmitQuery() {
    if (fetching) return;
    setError(false);
    setFetching(true);

    let uri = '';

    // First fetch from AI
    fetchAnswer(query)
      .then((res) => {
        if (res.story !== undefined) {
          console.log(res.story);
          setError(true);
        } else {
          console.log('ANSWER from AI: ' + res);

          // Second fetch for recipe
          uri = res.request.uri;
          console.log(uri);
          fetchRecipesViaURI(uri, true)
            .then((res) => {
              setFetching(true);
              navigation.navigate(routes.recipeViewScreen, {
                res: res,
                aiScreen: true,
                uri: res._links.next.href,
              });
            })
            .catch((err) => {
              console.error('Error in fetch Recipe: ' + err);
              setError(true);
            })
            .finally(() => setFetching(false));
        }
      })
      .catch((err) => {
        console.error('Error in fetch Answer: ' + err);
        setError(true);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.inputSearchContainer}>
        <View style={styles.inputContainer}>
          <DefaultSearchBar
            input={query}
            onChangeText={setQuery}
            onSubmitEditing={onSubmitQuery}
          />
          {error ? (
            <Text style={styles.errorText}>Error... Try again</Text>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            title={'Search'}
            loading={fetching}
            onPress={onSubmitQuery}
            disabled={query.length == 0 ? true : false}
            buttonStyle={styles.searchButton}
          />
        </View>
      </View>

      <View style={styles.listContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    marginBottom: 8,
    //backgroundColor: 'red',
  },
  inputSearchContainer: {
    flex: 1,
    justifyContent: 'center',
    verticalAlign: 'center',
  },
  listContainer: {},
  buttonContainer: {
    alignItems: 'center',
    margin: 10,
  },
  searchButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    backgroundColor: colors.accent,
  },
  errorText: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
