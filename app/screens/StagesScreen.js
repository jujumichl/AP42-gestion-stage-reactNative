import { View, Text, StyleSheet} from 'react-native';

export default function StagesScreen() {   
    return (
    <View style={styles.container}>
      <Text style={styles.titre}>Stages en construction !</Text>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  titre: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#97043cff',
  },
});