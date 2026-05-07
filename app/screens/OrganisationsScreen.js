import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthProvider';
import { getOrganisations } from '../api/organisations';
import ItemOrganisation from '../components/ItemOrganisation';

export default function OrganisationsScreen() {
  const [listeOrganisations, setListeOrganisations] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();

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
      return () => { };
    }, [])
  );

  const appelerNumero = async (numero) => {
    if (!numero) return;
    const url = `tel:${numero}`;
    await Linking.openURL(url);
  };

  const ouvrirLien = async (urlSiteWeb) => {
    if (!urlSiteWeb) return;
    if (urlSiteWeb.includes('https://') || urlSiteWeb.includes('http://')) {
      console.log("url correct")
      await Linking.openURL(urlSiteWeb);
    }
    else {
      const url = "https://" + urlSiteWeb;
      await Linking.openURL(url);
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('OrganisationDetail', { organisation: item })}>
      <View style={styles.card}>
        <Text style={styles.nom}>{item.nom}</Text>
        <View style={styles.adresse}>
          <Text style={styles.details}>{item.ville}</Text>
          <Text style={styles.details}>{item.rue}</Text>
          <Text style={styles.details}>{item.codePostal}</Text>
        </View>
        {item.tel ? (
          <TouchableOpacity onPress={() => appelerNumero(item.tel)}>
            <Text style={[styles.details, { color: '#007AFF', textDecorationLine: 'underline' }]}>{item.tel}</Text>
          </TouchableOpacity>
        ) : null}
        {item.urlSiteWeb ? (
          <TouchableOpacity onPress={() => ouvrirLien(item.urlSiteWeb)}>
            <Text style={[styles.details, { color: '#007AFF', textDecorationLine: 'underline' }]}>{item.urlSiteWeb}</Text>
          </TouchableOpacity>
        ) : null}
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
    height: 120,
  },
  nom: {
    fontSize: 18,
    width: 230,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  adresse: {
    position: 'absolute',
    marginTop: 25,
    marginLeft: 250,
    width: 70,
  },
  details: {
    fontSize: 12,
    width: 150,
    color: '#666',
    marginTop: 3,
  },
});