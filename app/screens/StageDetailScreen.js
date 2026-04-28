import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput } from 'react-native';

export default function StagesDetailScreen({ route }) {
  const stage = route.params.stage;
  const [dateDebut, setDateDebut] = useState(formatDateFR(String(stage.periodeStage.dateDebut.split("T", 1))));
  const [dateFin, setDateFin] = useState(formatDateFR(String(stage.periodeStage.dateFin.split("T", 1))));
  
  // Pour formater a la FR
  

  // Stage
  const competence = stage.competence;
  const desc = stage.descriptifMissions;
  

  // Etudiant
  const spe = stage.etudiant.specialite.sigle;

  // Organisation
  const orga = stage.organisation.nom;
  const orgaCat = stage.organisation.Catégorie.libelle;
  const rue = stage.organisation.rue;
  const cp = stage.organisation.codePostal; 
  const ville = stage.organisation.ville;
  const tel = stage.organisation.tel;
  const email = stage.organisation.email;
  const urlSite = stage.organisation.urlSiteWeb;

  function formatDateFR (date){
    let j = date.split("-")[2];
    let m = date.split("-")[1];
    let a = date.split("-")[0];
    return `${j}-${m}-${a}`;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formCard}>
            <Text style={styles.title}>{orga}</Text>
            <Text style={styles.details}>{desc}</Text>

            { /* Champ adresse */ }
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse</Text>
              <Text style={styles.details}>{rue}, {cp} {ville}</Text>
            </View>

            { /* Champ Période */ }
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Période</Text>
              <Text style={styles.details}>Du {dateDebut} au {dateFin}</Text>
            </View>

            { /* Champ Informations */ }
            <View style={styles.inputGroup}>

              <Text style={styles.label}>Numéros de Téléphone : </Text>
              <Text style={styles.details}>{tel}</Text>

              <Text style={styles.label}>Email : </Text>
              <Text style={styles.details}>{email}</Text>

              <Text style={styles.label}>Site Web : </Text>
              <Text style={styles.details}>{urlSite}</Text>

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
    flex: 1,
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
});