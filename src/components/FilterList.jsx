import { StyleSheet, View, Text, SectionList } from 'react-native';
import ToggleChip from './ToggleChip';

const SectionHeader = ({ section: { title } }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const FiltersContainer = ({ item: filters }) => {
  return (
    <View style={styles.filtersContainer}>
      {filters.map((filter) => (
        <ToggleChip title={filter} />
      ))}
    </View>
  );
};

export default function FilterList({ data }) {
  return (
    <SectionList
      sections={data}
      renderSectionHeader={SectionHeader}
      renderItem={FiltersContainer}
      stickySectionHeadersEnabled={false}
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
