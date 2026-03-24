import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthProvider';
import { getOrganisations } from '../api/organisations';

export default function OrganisationsScreen() {
    const [listeOrganisations, setListeOrganisations] = useState([]);
    const navigation = useNavigation();
    const {user} = useAuth();

    // callback appelée à chaque fois que l'écran reçoit le focus
    useFocusEffect(
      React.useCallback(() => {
        async function fetchData() {        
            const token = user.token;
            try {
                let body = await getOrganisations(token);              
                setListeOrganisations(body.data);
            } 
            catch (error) {
              console.log(`OrganisationsScreen - Erreur lors de la récupération des organisations : ${error}`);  
              if (error.cause === 401) {
                  alert(`Connexion échue. Il faut vous reconnecter`);
                  logout();
              }
           }
        }

        fetchData();

        // Optionnel : une fonction de nettoyage si nécessaire
        return () => {}; 
      }, []) 
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('OrganisationDetail', { organisation: item })}>
            <View style={styles.card}>
              <Text style={styles.nom}>{item.nom}</Text>            
              <Text style={styles.details}>{item.ville}</Text>   
            </View>
        </TouchableOpacity>
    );    
    return (
        <View style={styles.container}>
          <FlatList
            data={listeOrganisations}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
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