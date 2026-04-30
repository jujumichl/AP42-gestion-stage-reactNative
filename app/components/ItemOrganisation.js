import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ItemOrganisation({ itemOrga }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('OrganisationDetail', { organisation: itemOrga })}>
            <View style={styles.card}>
              <Text style={styles.nom}>{itemOrga.nom}</Text>            
              <Text style={styles.details}>{itemOrga.ville}</Text>   
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    elevation: 2,
  },
  nom: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: '#666',
  },
});