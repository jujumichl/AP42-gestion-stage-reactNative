import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Button, FlatList } from 'react-native';
import { useAuth } from '../context/AuthProvider';
import { putOrganisation, getOrganisationContacts } from '../api/organisations';

export default function OrganisationDetailScreen({ route }) {
  const organisation = route.params.organisation;
  const [rue, setRue] = useState(organisation.rue);
  const [ville, setVille] = useState(organisation.ville);
  const [codePostal, setCodePostal] = useState(organisation.codePostal);
  const [tel, setTel] = useState(organisation.tel);
  const [email, setEmail] = useState(organisation.email);
  const [urlSiteWeb, setUrlSiteWeb] = useState(organisation.urlSiteWeb);

  const { user, logout } = useAuth();

  const [contacts, setContacts] = useState(organisation.contacts);

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

    async function contactOrganisation() {
      try {
        const body = await getContact(token);
        console.log(`OrganisationDetailScreen - Contact de l'organisation : ${body.message}`);
        setContacts(body.contacts);
      }
      catch (error) {
        console.log(`OrganisationDetailScreen - Erreur lors de la récupération des contacts de l'organisation : ${error}`);
        if (error.cause === 401) {
          alert(`Connexion échue. Il faut vous reconnecter`);
          logout();
        }
      }
    };
    // récupération du jeton stocké dans la mémoire asynchrone
    const token = user.token;

    const renderItem = ({ item }) => (
      <View>
        <Text style={styles.details}>Nom : {item.nom}</Text>
        <Text style={styles.details}>Prénom : {item.prenom}</Text>
        <Text style={styles.details}>Email : {item.email}</Text>
        <Text style={styles.details}>Téléphone : {item.tel}</Text>
      </View>
    );

    // demande de modification de l'organisation fournie
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
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>{organisation.nom}</Text>

        { /* Champ adresse */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Adresse</Text>
          <TextInput style={styles.details}
            placeHolder="100 boulevard de l'Europe"
            value={rue}
            onChangeText={setRue}
          />
        </View>

        { /* Champ code postal */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Code postal</Text>
          <TextInput style={styles.details}
            placeHolder='35200'
            value={codePostal}
            onChangeText={setCodePostal}
          />
        </View>
        { /* Champ ville */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ville</Text>
          <TextInput style={styles.details}
            placeHolder='Rennes'
            value={ville}
            onChangeText={setVille}
          />
        </View>
        { /* Champ téléphone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Téléphone</Text>
          <TextInput style={styles.details}
            placeHolder='0123456789'
            value={tel}
            onChangeText={setTel}
          />
        </View>{ /* Champ email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.details}
            placeHolder='nom.prenom@exemple.com'
            value={email}
            onChangeText={setEmail}
          />
        </View>{ /* Champ Url Site Web */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Url Site Web</Text>
          <TextInput style={styles.details}
            placeHolder='https://www.exemple.com'
            value={urlSiteWeb}
            onChangeText={setUrlSiteWeb}
          />
        </View>
        <Button style={styles.modifier} title="Modifier" onPress={validerOrganisation} />
      </View>
      <View style={styles.formCard}>
        <Text style={styles.titleContact}>Contact de l'entreprise : {organisation.nom}</Text>
        <View>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  formCard: {
    width: '80%'
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
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
  titleContact: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
  }
});