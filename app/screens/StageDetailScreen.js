import HeaderStagesDetail from '../components/stage/HeaderStagesDetail';
import TableCompetence from '../components/stage/TableCompetence';
import { StyleSheet, View, FlatList } from 'react-native';

export default function StagesDetailScreen({ route }) {
  const stage = route.params.stage;

  const renderItem = ({ item }) => (<TableCompetence competence={item} />);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
      nestedScrollEnabled={true}
      data={stage.competence}
      style={{ flex: 1 }}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <HeaderStagesDetail stage={stage} />
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flexGrow: 1,
  },
});