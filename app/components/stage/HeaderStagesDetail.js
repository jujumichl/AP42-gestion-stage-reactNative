import { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";

export default function HeaderStagesDetail({ stage }) {
    const [dateDebut, setDateDebut] = useState(formatDateFR(String(stage.periodeStage.dateDebut.split("T", 1))));
    const [dateFin, setDateFin] = useState(formatDateFR(String(stage.periodeStage.dateFin.split("T", 1))));

    function formatDateFR(date) {
    let j = date.split("-")[2];
    let m = date.split("-")[1];
    let a = date.split("-")[0];
    return `${j}-${m}-${a}`;
    }
    return (
        <View style={styles.formCard}>
          <Text style={styles.title}>Informations</Text>
          <Text style={styles.label}>Description : </Text>
          <Text style={styles.details}>{stage.descriptifMissions ?? "Aucune rue renseignée"}</Text>

          { /* Champ adresse */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse : </Text>
            <Text style={styles.details}>{stage.organisation.rue ?? "Aucune rue renseignée"}, {stage.organisation.codePostal ?? "Aucun code postal renseigné"} {stage.organisation.ville ?? "Aucune ville renseignée"}</Text>
          </View>

          { /* Champ Période */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Période : </Text>
            <Text style={styles.details}>Du {dateDebut ?? "Aucune date de début renseignée"} au {dateFin ?? "Aucune date de fin renseignée"}</Text>
          </View>

          { /* Champ Informations */}
          <View style={styles.inputGroup}>

            <Text style={styles.label}>Numéros de Téléphone : </Text>
            <Text style={styles.details}>{stage.organisation.tel ?? "Aucun numéro de téléphone renseigné"}</Text>

            <Text style={styles.label}>Email : </Text>
            <Text style={styles.details}>{stage.organisation.email ?? "Aucun email renseigné"}</Text>

            <Text style={styles.label}>Site Web : </Text>
            <Text style={styles.details}>{stage.organisation.urlSiteWeb ?? "Aucun site web renseigné"}</Text>
          </View>

          <Text style={styles.title}>Compétences exploitées</Text>
          
          <View style={styles.row}>
            <Text style={styles.cell}>Numéros</Text>
            <Text style={styles.cell}>Libelle</Text>
            <Text style={styles.cell}>Spécialité</Text>
          </View>
        </View>
    );
}
const styles = StyleSheet.create({
  formCard: {
    width: '100%',
    marginBottom: 8
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
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
});
