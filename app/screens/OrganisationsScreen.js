import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthProvider';
import { getOrganisations } from '../api/organisations';
import ItemOrganisation from '../components/ItemOrganisation';

export default function OrganisationsScreen() {
    const [listeOrganisations, setListeOrganisations] = useState([]);
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
   
    return (
        <View style={styles.container}>
          <FlatList
            data={listeOrganisations}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (<ItemOrganisation itemOrga={item} />)}
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
});