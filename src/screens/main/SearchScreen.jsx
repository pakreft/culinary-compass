import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';

import DefaultSearchBar from '../../components/DefaultSearchBar';
import MainButton from '../../components/MainButton';
import { fetchAnswer, fetchRecipesViaURI } from '../../api/edamam';
import { routes } from '../../constants/routes';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [fetching, setFetching] = useState(false);
  const [respone, setResponse] = useState([]);
  const [error, setError] = useState(false);

  function onSubmitQuery() {
    if (fetching) return;
    setError(false);
    setFetching(true);

    let uri = '';

    // First fetch from AI
    fetchAnswer(query)
      .then((res) => {
        if (res.story !== undefined) setError(true);
        else {
          // Second fetch for recipe
          uri = res.request.uri;
          console.log(uri);
          fetchRecipesViaURI(uri, true)
            .then((res) => {
              console.log('RESPONSE :' + res.hits);
              navigation.navigate(routes.recipeViewScreen, {
                res: res,
              });
            })
            .catch((err) => {
              //console.log(err);
              setError(true);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.inputContainer}>
        <DefaultSearchBar input={query} onChangeText={setQuery} />
        {error ? (
          <Text style={styles.errorText}>Error... Try again</Text>
        ) : null}
      </View>
      <View style={styles.listContainer}></View>
      <View style={styles.buttonContainer}>
        <MainButton
          loading={fetching}
          onPress={onSubmitQuery}
          disabled={query.length == 0 ? true : false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 8,
  },
  inputContainer: {
    marginBottom: 8,
    //backgroundColor: 'red',
  },
  listContainer: {
    flex: 1,
    //backgroundColor: 'blue',
  },
  buttonContainer: {
    //backgroundColor: 'yellow',
  },
  errorText: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
