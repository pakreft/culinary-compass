import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';

export default function FilterList({ filters, renderItem }) {
  const [sections, setSections] = useState([]);

  useEffect(() => setSections(convertToSectionListData(filters)), [filters]);

  function convertToSectionListData(filters) {
    const result = [];

    for (const key in filters) {
      const section = {
        title: key,
        data: [filters[key]], // Put the array into another array, otherwise chips stack vertical
      };
      result.push(section);
    }

    return result;
  }

  function pascalCaseToCapitalizedWords(str) {
    // Add a space before all uppercase letters (that are not at the start of the string)
    const spacedString = str.replace(/([A-Z])/g, ' $1').trim();
    // Capitalize the first letter of each word
    const capitalizedString = spacedString.replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );
    return capitalizedString;
  }

  return (
    <SectionList
      sections={sections}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>
          {pascalCaseToCapitalizedWords(section.title)}
        </Text>
      )}
      renderItem={({ section }) => (
        <View style={styles.filtersContainer}>
          {section.data[0].map((key) =>
            renderItem({ categorie: section.title, filterKey: key }),
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 23,
    marginBottom: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 15,
  },
});
