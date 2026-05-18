import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput, FlatList, Button } from 'react-native';
import ContactsOrganisation from '../components/organisationComponents/ContactsOrganisation';

import { useAuth } from '../context/AuthProvider';
import { putOrganisation } from '../api/organisations';
import { getContactsOrganisation } from '../api/contacts';

export default function OrganisationDetailScreen({ route }) {
  const [listeContacts, setListeContacts] = useState([]);
  const navigation = useNavigation();
  const organisation = route.params.organisation;
  const [rue, setRue] = useState(organisation.rue);
  const [ville, setVille] = useState(organisation.ville);
  const [codePostal, setCodePostal] = useState(organisation.codePostal);
  const [tel, setTel] = useState(organisation.tel);
  const [email, setEmail] = useState(organisation.email);
  const [urlSiteWeb, setUrlSiteWeb] = useState(organisation.urlSiteWeb);

  const { user, logout } = useAuth();

  // callback appelée à chaque fois que l'écran reçoit le focus
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const token = user.token;
        try {
          let body = await getContactsOrganisation(token, organisation.id);
          setListeContacts(body.data);
        }
        catch (error) {
          console.log(`OrganisationsDetailScreen - Erreur lors de la récupération des contacts : ${error}`);
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

  // récupération du jeton stocké dans la mémoire asynchrone
  const token = user.token;
  async function validerOrganisation() {
    let unBody = {};
    // regroupement des données à modifier, puis appel API-REST
    if (organisation.rue !== rue) unBody.rue = rue;
    if (organisation.ville !== ville) unBody.ville = ville;
    if (organisation.codePostal !== codePostal) unBody.codePostal = codePostal;
    if (organisation.tel !== tel) unBody.tel = tel;
    if (organisation.email !== email) unBody.email = email;
    if (organisation.urlSiteWeb !== urlSiteWeb) unBody.urlSiteWeb = urlSiteWeb;
    if (Object.keys(unBody).length === 0) {
      alert('Aucune modification observée');
      console.log('OrganisationDetailScreen - Aucune modification observée');
      return;
    }
    try {
      const body = await putOrganisation(token, organisation.id, unBody);
      console.log(`OrganisationDetailScreen - Modification enregistrée : ${body.message}`);
      alert('Modification enregistrée !');
      organisation.rue = unBody.rue;
      organisation.ville = unBody.ville;
      organisation.codePostal = unBody.codePostal;
      organisation.tel = unBody.tel;
      organisation.email = unBody.email;
      organisation.urlSiteWeb = unBody.urlSiteWeb;
    }
    catch (error) {
      console.log(`OrganisationDetailScreen - Erreur lors de la modification de l'organisation : ${error}`);
      if (error.cause === 401) {
        alert(`Connexion échue. Il faut vous reconnecter`);
        logout();
      }
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
    >
      <FlatList
        style={styles.list}
        data={listeContacts}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListHeaderComponent={
          <View>
            <View style={styles.formCard}>
              <Text style={styles.title}>{organisation.nom}</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Adresse</Text>
                <TextInput style={styles.details}
                  placeholder="100 boulevard de l'Europe"
                  value={rue}
                  onChangeText={setRue}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Code postal</Text>
                <TextInput style={styles.details}
                  placeholder='35200'
                  value={codePostal}
                  onChangeText={setCodePostal}
                  keyboardType="numeric" // Petit bonus pour l'UX
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Ville</Text>
                <TextInput style={styles.details}
                  placeholder='Rennes'
                  value={ville}
                  onChangeText={setVille}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Téléphone</Text>
                <TextInput style={styles.details}
                  placeholder='0123456789'
                  value={tel}
                  onChangeText={setTel}
                  keyboardType="phone-pad" // Petit bonus pour l'UX
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.details}
                  placeholder='nom.prenom@exemple.com'
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Url Site Web</Text>
                <TextInput style={styles.details}
                  placeholder='https://www.exemple.com'
                  value={urlSiteWeb}
                  onChangeText={setUrlSiteWeb}
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </View>
            </View>
            <Button title="Modifier" onPress={validerOrganisation} />
            <Text style={styles.titleContact}>Contacts associés</Text>
            <ContactsOrganisation contact={Object.entries(listeContacts)} />
          </View>
        }

        ListEmptyComponent={<Text style={styles.details}>Aucun contact trouvé.</Text>}
        contentContainerStyle={styles.container} // Le style s'applique ici maintenant
      />
      <Button title='Ajouter un contact' onPress={() => navigation.navigate('AjouterContactScreen', { organisation })} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  container: {
    padding: 16,

    backgroundColor: 'white',
  },
  nom: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    marginBottom: 12,
    color: '#444',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#666',
  },
  titleContact: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  contactItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  formCard: {
    width: '80%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});